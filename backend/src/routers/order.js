const express = require('express');
const Product = require('../models/product');




const {Router} = express;
const router = Router()


router.post(`/`,async(req, res)=>{
      
    try{
        const product = new Product({
            name:req.body.name,
            image:req.body.image,
            countInStock:req.body.countInStock
        })
       const createdProduct =   await product.save() 
       res.status(201).json(createdProduct)
    }catch(err){
        res.status(500).json({error:err.message,success:false})

    }
 })

router.get(`/`, async(req, res) => {
    const productList =  await Product.find()
    if(!productList){
        res.status(500).json({error: 'Product not found',success:false})
    }
    res.send(productList)
})

module.exports = router;