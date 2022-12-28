const mongoose = require('mongoose');
const { Schema } = mongoose;



 const orderSchema = new Schema({
    name:String,
    image:String,
    countInStock:Number,
 })

 const Order = mongoose.model('order', orderSchema)

 module.exports = Order