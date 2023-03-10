const mongoose = require('mongoose');
const { Schema } = mongoose;



 const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
    },
    color:{
        type:String,
    }
    

 })

 categorySchema.virtual('id').get(function(){
    return this._id.toHexString()
 })
 
 categorySchema.set('toJSON',{virtuals:true})



 module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema)