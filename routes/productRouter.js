import express from "express";
const router = express.Router()
import productController from '../controller/productController.js'

router.route('/products')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/products/:id')
    .delete(productController.deleteProduct)
    .put(productController.updateProduct)

router.post('/quantity/:id', productController.updateQuantity)


export default router