import express from "express"
const router = express.Router()
import categoryController from '../controller/categoryController.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'



router.route('/category')
    .get(categoryController.getCategories)
    .post(auth, authAdmin, categoryController.createCategory)

export default router