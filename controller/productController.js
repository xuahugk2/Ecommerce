import productModel from '../models/productModel.js'

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filtering(){
        const queryObj = {...this.queryString}

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //gte = greater than or equal
        //gt = greater than
        //lte = lesser than or equal
        //lt = lesser than
        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    sorting(){
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

const productController = {
    getProducts: async(req, res) => {
        try {
            const features = new APIfeatures(productModel.find(), req.query)
                .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (error) {
           return res.status(500).json({msg: 'Can not get any product.'}) 
        }
    },
    createProduct: async(req, res) => {
        try {
            const {product_id, title, price, quantity, description, content, images, category} = req.body

            if(!images) 
                return res.status(400).json({msg: 'No images uploaded.'})

            const product = await productModel.findOne({product_id})

            if(product)
                return res.status(400).json({msg: 'This product already exists.'})

            const newProduct = new productModel({
                product_id,
                title,
                price,
                quantity,
                description,
                content,
                images,
                category
            })

            await newProduct.save()

            res.json({msg: "Created a product."})
        } catch (error) {
           return res.status(500).json({msg: 'Can not create this product.'}) 
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await productModel.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted a product."})
        } catch (error) {
           return res.status(500).json({msg: 'Can not delete this product.'}) 
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {title, price, quantity, description, content, images, category} = req.body

            if(!images)
                return res.status(400).json({msg: 'No images uploaded.'})

            await productModel.findByIdAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, quantity, description, content, images, category
            })

            res.json({msg: "Updated a product."})
        } catch (error) {
           return res.status(500).json({msg: 'Can not update this product.'}) 
        }
    }, 
    updateQuantity: async (req, res) => {
        try {
            const {sold} = req.body

            const product = await productModel.findOne({_id: req.params.id})

            const amount = product.quantity

            console.log({amount: amount});

            await productModel.findByIdAndUpdate({_id: req.params.id}, {
                quantity: amount - sold
            })

            res.json({msg: "Updated quantity."})
        } catch (error) {
            return res.status(500).json({msg: 'Can not update this product.'}) 
        }
    }
}

export default productController