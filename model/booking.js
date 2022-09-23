const mongoose= require("mongoose")
const bookingSchema= mongoose.Schema({
   
   
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tour"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    payment:Boolean,
   
      
})

module.exports= mongoose.model('booking',bookingSchema)
