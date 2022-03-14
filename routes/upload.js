import express from "express"
const router = express.Router()
import cloudinary from './cloud/cloudinary.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'
import fs from 'fs'

//Upload Image only admin can use
router.post('/upload', (req, res) => {
    try {

        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})

        const file = req.files.file

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: 'File format is incorrect.'})
        }

        if(file.size > 1024*1024){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: 'Size too large.'})
        }
        
        cloudinary.upload(file.tempFilePath, {folder: "ecommerce"},
            async (err, result) => {
                if (err)
                    console.log({Error: err});

                console.log("File is being uploaded.");

                removeTemp(file.tempFilePath)
                console.log({result: result});

                return res.status(500).json({
                    public_id: result.public_id, 
                    url: result.secure_url,
                })
        })


        return res.status(400).json({msg: 'File upload fail.'})
            
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

//Delete Image only admin can use
router.post('/destroy', (req, res) => {
    try {
        const {public_id} = req.body
        if(!public_id) res.status(400).json({msg: 'No image selected'})

        cloudinary.destroy(public_id, async(err, result) => {
            if(err) throw err

            res.json({mgs: 'Deleted Image'})
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

export default router