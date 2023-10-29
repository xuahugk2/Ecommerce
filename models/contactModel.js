import mongoose from "mongoose"

const contactModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    tel: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Contacts', contactModel)