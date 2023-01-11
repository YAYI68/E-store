const { Router } = require("express");
const User = require('../models/user');
const { hashPassword, createJwt, verifyPassword } = require('../utils/auth');



const router = Router()


router.post(`/register`,async(req, res)=>{
    try{
        const hashedPassword = await hashPassword(req.body.password)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone,
            street:req.body.street,
            isAdmin:req.body.isAdmin,
            appartment:req.body.appartment,
            zip:req.body.zip,
            city:req.body.city,
            country:req.body.country
        })
       const userCreated =   await user.save() 
       res.status(201).json(userCreated)
    }catch(err){
        res.status(500).json({error:err.message,success:false})
    }
 })

router.get(`/`, async(req, res) => {
    try{
        const userList =  await User.find().select('-password')
        if(!userList){
            res.status(500).json({error: 'Users not found',success:false})
        }
        res.send(userList)
    }
    catch(err){
        res.status(500).json({error: err.message,success:false})
    }
  
})
router.get(`/:id`, async(req, res) => {
    try{
        const singleUser =  await User.findById(req.params.id).select('-password')
        if(!singleUser){
            res.status(500).json({error: 'User not found',success:false})
        }
        res.send(singleUser)
    }
    catch(err){
        res.status(500).json({error: err.message,success:false})
    }
  
})

router.post('/login',async(req,res)=>{
    
    try {
        const user = await User.findOne({email: req.body.email})        
    if(!user){
        return res.status(500).json({error: 'User not found',success:false})         
    }
    const isValid = await verifyPassword(req.body.password,user.password)
    if(!isValid){
        return res.status(500).json({error:'Invalid User email/Password'})
    }
    if(user && isValid){
       const token = createJwt(user)
       return res.status(200).json({token,email:user.email})
    } 
    }
    catch(err){
       return res.status(500).json({error: err.message}) 
    }
})

router.get('/count',async(req, res)=>{
    try {
        const userCount = await User.countDocuments((count)=>count)
        if(!userCount){
            res.status(500).json({success: false, message:'No records found'})
        }
        res.status(200).json({count:userCount})
    }catch(err){
        res.status(500).json({success: false,error:err.message});
    }
})

router.delete('/:id', async(req, res) => {
    const isValidId = mongoose.isValidObjectId(req.params.id)
    if (!isValidId){
      return res.status(400).json({ message:  'Invalid product id' })
    }
    try{
      const user = User.findByIdAndRemove(req.params.id)
       if(user){
           return res.status(200).json({success:true, message:"The product has been removed"})
       }
       else{
           return res.status(404).json({success:false, message:"product not found"})
       }
       
   }catch(err){
     return  res.status(500).json({error: err.message,success:false})
   }
})





module.exports = router;