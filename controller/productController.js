import productModel from '../models/productModel.js'

const productController = {
    getProducts: async(req, res) => {
        try {
            
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    },
    createProduct: async(req, res) => {
        try {
            
        } catch (error) {
           return res.status(500).json({msg: error.message}) 
        }
    }
}

export default productController