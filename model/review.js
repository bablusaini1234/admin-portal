const mongoose= require("mongoose")
const reviewSchema= mongoose.Schema({
    review:String,
    rating:Number,
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tour"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
      
})

module.exports= mongoose.model('review',reviewSchema)
