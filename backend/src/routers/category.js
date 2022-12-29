const express = require('express');
const Category = require('../models/Category');




const {Router} = express;
const router = Router()


router.post(`/`,async(req, res)=>{
      
    try{
        const Category = new Category({
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color,
        })
       const createdCategory =   await Category.save() 
       res.status(201).json(createdCategory)
    }catch(err){
        res.status(500).json({error:err.message,success:false})

    }
 })

router.get(`/`, async(req, res) => {
    const CategoryList =  await Category.find()
    if(!CategoryList){
        res.status(500).json({error: 'Product not found',success:false})
    }
    res.status(200).send(CategoryList)
})

router.get(`/:id`, async(req, res) => {

    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(404).json({message:'The categor with the given ID was not found'});
    }
    res.status(200).send(category)
})

router.put('/:id', async(req, res) => {
      const category = await Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
      },
      {new: true}
      )
})

router.delete('/:id', async(req, res) => {
    try{
       const category = Category.findByIdAndRemove(req.params.id)
        if(category){
            return res.status(200).json({success:true, message:"The category has been removed"})
        }
        else{
            return res.status(404).json({success:false, message:"category not found"})
        }
        
    }catch(err){
      return  res.status(500).json({error: err.message,success:false})
    }
   
})

module.exports = router;