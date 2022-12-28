const mongoose = require('mongoose');
const { Schema } = mongoose;



 const categorySchema = new Schema({
    name:String,
    image:String,
    countInStock:Number,
 })

 const Category = mongoose.model('category', categorySchema)

 module.exports = Category