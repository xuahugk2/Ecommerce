import express from "express"
const router = express.Router()
import categoryController from '../controller/categoryController.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'



router.route('/category')
    .get(categoryController.getCategories)
    .post(auth, authAdmin, categoryController.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)

export default router