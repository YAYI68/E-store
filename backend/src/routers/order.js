const { Router } = require("express");
const Order = require('../models/order');
const OrderItem = require('../models/order-item');




const router = Router()


router.post(`/`,async(req, res)=>{    
    try{
        const orderItemsIds =await Promise.all([
            req.body.orderItems.map(async(item)=>{
                const newOrderItem = new OrderItem({
                    quantity: item.quantity,
                    product: item.product
                })
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id
            })
        ]) 
      
        const totalPrices = await Promise.all([orderItemsIds.map((orderItem)=>{
             const order = OrderItem.findById(orderItem).populate('product','price');
             const total = order.product.price * order.quantity
             return total
        })])

        const totalPrice = totalPrices.reduce((a,b)=>a + b , 0)


        const order = new Order({
           orderItems:orderItemsIds,
           shippingAddress1:req.body.shippingAddress1,
           shippingAddress2:req.body.shippingAddress2,
           city:req.body.city,
           zip:req.body.zip,
           country:req.body.country,
           phone:req.body.phone,
           status:req.body.status,
           totalPrice:totalPrice,
           user:req.body.user
        })
       const createdOrder =   await order.save() 
       res.status(201).json(createdOrder)
    }catch(err){
        res.status(500).json({error:err.message,success:false})

    }
 })

router.get(`/`, async(req, res) => {
    const orderList =  await Order.find().populate('user','name').sort({'dateOrdered':-1})
    if(!orderList){
        res.status(500).json({error: 'Product not found',success:false})
    }
    res.send(orderList)
})

router.get(`/:id`, async(req, res) => {
    const order =  await Order.findById(req.params.id).populate('user','name').populate({
        path:'orderItems',
        populate:{
            path:'product',populate:'category',
        }});
    if(!order){
        res.status(500).json({error: 'Product not found',success:false})
    }
    res.send(orderList)
})


router.put('/:id', async(req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id,{
     status:req.body.status
    },
    {new: true}
    )
    if(!order){
      return res.status(404).json({message:'order cannot be updated'})
  }
  res.status(201).json({message:'order updated'})
})


router.delete('/:id', async(req, res) => {
    try{
       const order = Order.findByIdAndRemove(req.params.id)
        if(order){
            await order.orderItems.map(async(orderItem)=>{
              await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success:true, message:"The order has been removed"})
        }
        else{
            return res.status(404).json({success:false, message:"order not found"})
        }
        
    }catch(err){
      return  res.status(500).json({error: err.message,success:false})
    }
   
})

router.get('/totalsales', async(req,res)=>{
      const totalSales = await Order.aggregate([
        {$group:{_id:null,totalsales:{$sum:'$totalPrice'}}}
      ])
      if(!totalSales){
        return res.status(400).json({success:false, message:'The order sales cannot be generated'})
      }
      res.status(200).json({totalsales:totalSales.pop().totalsales})
})

router.get('/count',async(req, res)=>{
    try {
        const orderCount = await Order.countDocuments((count)=>count)
        if(!orderCount){
            res.status(500).json({success: false, message:'No records found'})
        }
        res.status(200).json({count:orderCount})
    }catch(err){
        res.status(500).json({success: false,error:err.message});
    }
})

router.get('/userorders/:userId',async(req, res)=>{
    const userOrderList = await Order.find({user:req.params.userId}).populate({
        path:'orderItems',
        populate:{
            path:'product',populate:'category',
        }}).sort({'dateOrdered':-1});
    if(!userOrderList){
        res.status(500).json({success: false})
    } 
    res.status(200).json({userOrders:userOrderList})   
})



module.exports = router;