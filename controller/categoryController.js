import categoryModel from '../models/categoryModel.js'

const categoryController = {
    getCategories: async (req, res) => {
       try {
           const categories = await categoryModel.find()
           res.json(categories)
       } catch (error) {
           return res.status(500).json({msg: error.message})
       }
    },
    createCategory: async (req, res) => {
        try {
            res.json('Check admin success')
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

export default categoryController