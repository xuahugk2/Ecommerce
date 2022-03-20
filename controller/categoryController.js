import categoryModel from '../models/categoryModel.js'
import productModel from '../models/productModel.js'

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
            //if user have role = 1 ---> admin
            //only admin can create, delete and update category
            const {name} = req.body
            const category = await categoryModel.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})

            const newCategory = new categoryModel({name})

            await newCategory.save()
            res.json({msg: "Create a category"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const product = await productModel.findOne({category: req.params.id})
            if(product) {
                return res.status(400).json({
                    msg: 'Please delete all products with a relationship.'
                })
            }
            await categoryModel.findByIdAndDelete(req.params.id)
            res.json({msg: "Delete a Category"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body
            await categoryModel.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Update a category"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

export default categoryController