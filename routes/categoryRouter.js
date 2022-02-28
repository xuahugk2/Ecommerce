import express from "express"
const router = express.Router()
import categoryController from '../controller/categoryController.js'



router.route('/category').get(categoryController.getCategories)

export default router