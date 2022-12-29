const mongoose = require('mongoose');
const { Schema } = mongoose;



 const userSchema = new Schema({
    name:String,
    image:String,
    countInStock:Number,
 })

 userSchema.virtual('id').get(function(){
   return this._id.toHexString()
})

userSchema.set('toJSON',{virtuals:true}) 

 const User = mongoose.model('user', userSchema)

 module.exports = User