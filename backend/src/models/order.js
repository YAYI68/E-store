const mongoose = require('mongoose');
const { Schema } = mongoose;



 const orderSchema = new Schema({
    name:String,
    image:String,
    countInStock:Number,
 })

 orderSchema.virtual('id').get(function(){
   return this._id.toHexString()
})

orderSchema.set('toJSON',{virtuals:true})

 const Order = mongoose.model('order', orderSchema)

 module.exports = Order