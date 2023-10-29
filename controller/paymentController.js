import paymentModel from "../models/paymentModel.js"
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const paymentController = {
    getPayments: async (req, res) => {
        try {
            const payments = await paymentModel.find()

            res.json(payments)
        } catch (error) {
            return res.status(500).json({ msg: 'Can not get any payment.' })
        }
    },
    createPayments: async (req, res) => {
        try {
            const user = await userModel.findById(req.user.id).select('name email')

            if (!user) return res.status(400).json({ msg: 'User does not exist.' })

            const { cart, paymentID, address } = req.body
            const { _id, name, email } = user

            const newPayment = new paymentModel({
                user_id: _id,
                name,
                email,
                paymentID,
                address,
                cart
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            await newPayment.save()
            res.json({ msg: 'Your order is successfully paid.' })
        } catch (error) {
            return res.status(500).json({ msg: 'Can not make a payment now.' })
        }
    }
}

const sold = async (id, quantity, sold) => {
    await productModel.findOneAndUpdate({ _id: id }, {
        sold: sold + quantity
    })
}

export default paymentController