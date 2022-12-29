const mongoose = require('mongoose');
const { Schema } = mongoose;



 const OrderItemSchema = new Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }
 })

 OrderItemSchema.virtual('id').get(function(){
   return this._id.toHexString()
})

OrderItemSchema.set('toJSON',{virtuals:true})

 const OrderItem = mongoose.model('orderItem', OrderItemSchema)

 module.exports = OrderItem