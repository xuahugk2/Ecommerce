import express from "express"
const router = express.Router()
import cloudinary from 'cloudinary'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('./upload', (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        const file = req.files.file
        if(file.size > 1024*1024)//1mb
            return res.status(400).json({msg: 'Size too large.'})
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
            return res.status(400).json({msg: 'File format is incorrect.'})


        res.status(500).json("test upload")
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

export default router