const mongoose= require("mongoose")
const tourSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:Number,
    status:Number,
    mobile:Number,
    otp:Number

})

tourSchema.index({email:1})

module.exports=mongoose.model("user",tourSchema)