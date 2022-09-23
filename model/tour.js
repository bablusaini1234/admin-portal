const mongoose= require("mongoose")
const tourSchema= mongoose.Schema({
    tourName:String,
    price:Number,
    location:String
      
})

module.exports= mongoose.model('tour',tourSchema)
