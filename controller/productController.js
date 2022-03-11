import productModel from '../models/productModel.js'

const productController = {
    getProducts: async(req, res) => {
        try {
            const products = await productModel.find()

            res.json(products)
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    },
    createProduct: async(req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body

            if(!images) res.status(400).json({msg: 'No images uploaded.'})

            const product = await productModel.findOne({product_id})

            if(product)
                return res.status(400).json({msg: 'This product already exists.'})

            const newProduct = new productModel({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })

            await newProduct.save()

            res.json({msg: "Created a product"})
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    },
    deleteProduct: async(req, res) => {
        try {
            
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    },
    updateProduct: async(req, res) => {
        try {
            
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    }
}

export default productController