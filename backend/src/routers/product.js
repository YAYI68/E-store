const { response } = require('express');
const express = require('express');
const Category = require('../models/category');
const Product = require('../models/product');
const mongoose = require('mongoose');




const {Router} = express;
const router = Router()


router.post(`/`,async(req, res)=>{
     
    const category = new Category.findById(req.body.category)
    if(!category){
        return res.status(400).json({message:'Invalid category'})
    }  
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
       if(!product){
        return res.status(500).json({message:'No such product'})
       }
       res.status(201).json(createdProduct)
    }catch(err){
        res.status(500).json({error:err.message,success:false})

    }
 })

router.get(`/`, async(req, res) => {
    try{
        let filter = {}
        if(req.query.categories){
            filter = {category:req.query.categories.split(',')}
        }
        const productList =  await Product.find(filter).populate('category')
        // const productList =  await Product.find().select('name image -_id')
        if(!productList){
            res.status(500).json({error: 'Product not found',success:false})
        }
        res.send(productList)
    }
    catch(err){
        res.status(500).json({error:err.message,success:false})
    }
   
})


router.get(`/:id`, async(req, res) => {
    const product =  await Product.findById(req.params.id).populate('category')
    if(!productList){
        res.status(500).json({error: 'Product not found',success:false})
    }
    res.send(product)
})

router.put('/:id', async(req, res) => {
    const category = new Category.findById(req.body.category)
  
    if(!category){
        return res.status(400).json({message:'Invalid category'})
    }
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,{
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
        },
        {new: true}
        )
        if(!product){
            return res.status(404).json({message:'product cannot be updated'})
        }
        res.status(201).json({message:'product updated'})

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.delete('/:id', async(req, res) => {
      const isValidId = mongoose.isValidObjectId(req.params.id)
      if (!isValidId){
        return res.status(400).json({ message:  'Invalid product id' })
      }
      try{
        const product = Product.findByIdAndRemove(req.params.id)
         if(product){
             return res.status(200).json({success:true, message:"The product has been removed"})
         }
         else{
             return res.status(404).json({success:false, message:"product not found"})
         }
         
     }catch(err){
       return  res.status(500).json({error: err.message,success:false})
     }
})

router.get('/count',async(req, res)=>{
    try {
        const productCount = await Product.countDocuments((count)=>count)
        if(!productCount){
            res.status(500).json({success: false, message:'No records found'})
        }
        res.status(200).json({count:productCount})
    }catch(err){
        res.status(500).json({success: false,error:err.message});
    }
})

router.get('/featured/:count',async(req,res)=>{
    const count = req.params.count ? req.params.count : 0;
    try{
        const products = await Product.find({isFeatured:true}).limit(Number(count) );
        if(!products){
            res.status(500).json({success:false,message:'No featured products found'});
        }
        res.status(200).json({success:true,products:products});
    }
    catch(err){
       res.status(500).json({success:false,error:err.message})
    }

})


module.exports = router;