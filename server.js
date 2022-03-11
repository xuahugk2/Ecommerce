import dotenv from "dotenv";
dotenv.config()
import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Routers
import userRouter from './routes/userRouter.js'
app.use('/user', userRouter)

import categoryRouter from "./routes/categoryRouter.js"
app.use('/api', categoryRouter)

import upload from './routes/upload.js'
app.use('/api', upload)

import productRouter from './routes/productRouter.js'
app.use('/api', productRouter)

//Connect to MongoDB
const URI = process.env.MONGO_URI
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err
    console.log('Connected to MongoDB');
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})