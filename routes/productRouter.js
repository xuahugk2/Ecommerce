import express from "express";
const router = express.Router()

router.route('/products')
    .get()
    .post()

router.route('/products/:id')
    .delete()
    .put()


export default router