const express = require('express');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');





const {Router} = express;
const router = Router()


router.post(`/`,async(req, res)=>{    
    try{
        const orderItemsIds = Promise.all([
            req.body.orderItems.map(async(item)=>{
                const newOrderItem = new OrderItem({
                    quantity: item.quantity,
                    product: item.product
                })
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id
            })
        ]) 
        const orderIds = await orderItemsIds
        const order = new Order({
           orderItems:orderIds,
           shippingAddress1:req.body.shippingAddress1,
           shippingAddress2:req.body.shippingAddress2,
           city:req.body.city,
           zip:req.body.zip,
           country:req.body.country,
           phone:req.body.phone,
           status:req.body.status,
           totalPrice:req.body.totalPrice,
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


module.exports = router;