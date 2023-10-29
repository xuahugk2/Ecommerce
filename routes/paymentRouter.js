import express from "express"
const router = express.Router()
import paymentController from "../controller/paymentController.js"
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'

router.route('/payment')
    .get(auth, authAdmin, paymentController.getPayments)
    .post(auth, paymentController.createPayments)

export default router