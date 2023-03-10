const mongoose = require('mongoose');
const { Schema } = mongoose;



 const userSchema = new Schema({
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
   },
   password:{
      type:String,
      required:true,
   },
   street:{
      type:String,
      default:'',
   },
   appartment:{
     type:String,
     default:'',
   },
   zip:{
      type:String,
      default:'',
   },
   city:{
      type:String,
      default:'',
   },
   country:{
      type:String,
      default:'',
   },
   phone:{
      type:Number,
       required:true,
   },
   isAdmin:{
     type:Boolean,
     default:false,
   },
 })

 userSchema.virtual('id').get(function(){
   return this._id.toHexString()
})

userSchema.set('toJSON',{virtuals:true}) 

 module.exports = mongoose.model('User', userSchema)
