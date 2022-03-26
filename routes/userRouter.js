import userController from "../controller/userController.js";
import express from "express";
const userRouter = express.Router()
import auth from "../middleware/auth.js"
import authAdmin from "../middleware/authAdmin.js"

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.login)

userRouter.get('/logout', userController.logout)

userRouter.get('/refresh_token', userController.refreshToken)

userRouter.get('/infor', auth, userController.getUser)

userRouter.patch('/addcart', auth, userController.addCart)

userRouter.get('/history', auth, userController.history)

userRouter.get('/contacts', auth, authAdmin, userController.getContacts)

userRouter.post('/contact', userController.contact)

export default userRouter