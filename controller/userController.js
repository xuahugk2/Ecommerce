
import userModel from "../models/userModel.js"
import paymentModel from '../models/paymentModel.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userController = {
	register: async (req, res) => {
		try {
			const {name, email, password} = req.body

			const user = await userModel.findOne({email})
			if(user) {
				return res
					.status(400)
					.json({
						msg: "User already exists."
					})
			}
			if(password.length < 6) {
				return res
					.status(400)
					.json({
						msg: "Password must at least 6 character long."
					})
			}

			//Password Encryption
			const passwordHash = await bcrypt.hash(password, 10)
			const newUser = new userModel({
				name, email, password: passwordHash
			})

			//Save User
			await newUser.save()

			//Create jsonwebtoken to authentication
			const accessToken = createAccessToken({id: newUser._id})
			const refreshToken = createRefreshToken({id: newUser._id})

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
			})

			res.json({accessToken})
			//res.json({msg: "Register Success!"})
			
		} catch (error) {
			return res.status(500).json({msg: `Error: ${error.message}`})
		}
		
	},
	login: async (req, res) => {
		try {
			const {email, password} = req.body

			const user = await userModel.findOne({email})
			if(!user) {
				return res.status(400).json({msg: "User does not exists."})
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if(!isMatch) {
				return res.status(500).json({msg: "Incorrect password."})
			}

			//If Login success, create accessToken and refreshToken
			const accessToken = createAccessToken({id: user._id})
			const refreshToken = createRefreshToken({id: user._id})

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
			})

			res.json({accessToken})

		} catch (error) {
			return res.status(500).json({msg: error.message})
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshToken', {path: '/user/refresh_token'})
			return res.json({msg: "Logged out."})
		} catch (error) {
			return res.status(500).json({msg: error.message})
		}
	},
	refreshToken: (req, res) => {
		try {
			const rf_token = req.cookies.refreshToken

			if(!rf_token) {
				return res.status(400).json({msg: "Please Login or Register"})
			}

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if(err) {
					return res.status(400).json({msg: "Please Login or Register"}) 
				}
				const accessToken = createAccessToken({id: user.id})
				res.json({user, accessToken})
			})

			res.json({rf_token})
		} catch (error) {
			return res.status(500).json({msg: error.message})
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await userModel.findById(req.user.id)//.select('-password')
			if(!user) {
				return res.status(400).json({msg: "User does not exists."})
			}
			res.json(user)
		} catch (error) {
			return res.status(500).json({msg: error.message})
		}
	},
	addCart: async (req, res) => {
		try {
			const user = await userModel.findById(req.user.id)
			if(!user) {
				res.status(400).json({msg: 'User does not exists.'})
			}

			await userModel.findOneAndUpdate({_id: req.user.id}, {
				cart: req.body.cart
			})

			return res.json({msg: 'Added to cart.'})
		} catch (error) {
			res.status(500).json({msg: error.message})
		}
	},
	history: async (req, res) => {
		try {
			const history = await paymentModel.find({user_id: req.user.id})

			res.json(history)
		} catch (error) {
			return res.status(500).json({msg: err.message})
		}
	},
	contact: async (req, res) => {
		try {
			const {name, email, tel, description, type} = req.body

			return res.json({name, email, tel, description, type})
		} catch (error) {
			return res.status(500).json({msg: error.message})
		}
		
	}
}

const createAccessToken = (user) => {    
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user) => {    
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default userController