const TourRouter = require("express").Router()
const Tour = require("../model/tour")

const getTour = async (req, res) => {

    try {
      const tourData= await Tour.find()
        res.status(200).json({data:tourData})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   
   
}
const createTour = async (req, res) => {
    const tourname= req.body.tourName
    const price= req.body.price
    const location= req.body.location
    console.log(req.body)
    try {
        const newTour = new Tour({tourName:tourname,price:price,location:location})
        await newTour.save()
        res.status(201).json({data:newTour})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   
   
}

TourRouter
    .route("/tour")
    .get(getTour)
    .post(createTour)

module.exports = TourRouter