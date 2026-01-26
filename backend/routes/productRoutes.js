import express from 'express'
import { addProduct, listProduct, removeProduct } from '../controller/productController.js'
import upload from '../middelware/multer.js'
import adminAuth from "../middelware/adminAuth.js"


let productRoutes = express.Router()

productRoutes.post("/addProduct", upload.fields([{name:"image1", maxCount:1},
    {name:"image2", maxCount:1},{name:"image3", maxCount:1},{name:"image4", maxCount:1}]),addProduct)

productRoutes.get("/list", listProduct)
productRoutes.delete("/remove/:id",adminAuth,removeProduct)


    export default productRoutes