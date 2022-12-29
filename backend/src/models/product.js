const mongoose = require('mongoose');
const { Schema } = mongoose;



 const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:'',
    },
    discription:{
        type:String,
        default:'',
    },
    richDescription:{
        type:String,
        default:'',
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
    },
    price:{
        type:Number,
    },
    rating:{
       type:Number,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },
 })

 const Product = mongoose.model('Product', productSchema)

 module.exports = Product