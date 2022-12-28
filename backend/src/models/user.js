const mongoose = require('mongoose');
const { Schema } = mongoose;



 const userSchema = new Schema({
    name:String,
    image:String,
    countInStock:Number,
 })

 const User = mongoose.model('user', userSchema)

 module.exports = User