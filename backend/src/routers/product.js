const express = require('express');
const Product = require('../models/product');




const {Router} = express;
const router = Router()


router.post(`/`,async(req, res)=>{
      
    try{
        const product = new Product({
            name:req.body.name,
            image:req.body.image,
            discription:req.body.discription,
            richDescription:req.body.richDescription,
            price : req.body.price,
            Category:req.body.category,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured,
            countInStock:req.body.countInStock
        })
       const createdProduct =   await product.save() 
       if(!product)
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