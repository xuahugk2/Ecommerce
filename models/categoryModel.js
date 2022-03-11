import mongoose from "mongoose"

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Categories', categoryModel)