const mongoose= require("mongoose")
const gallerySchema= mongoose.Schema({
    image:String
})

module.exports= mongoose.model('gallery',gallerySchema)