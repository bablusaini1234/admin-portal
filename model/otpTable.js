const mongoose= require("mongoose")
const OtpSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:Number,
    status:Number,
    mobile:Number,
    otp:Number
      
})

module.exports= mongoose.model('otp',OtpSchema)
