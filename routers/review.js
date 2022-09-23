const reviewRouter = require("express").Router()
const review = require("../model/review")


const getAllreview = async (req, res) => {

try {
        review.find().populate("user").populate("tour")
            .then(p => res.status(200).json({ data: p }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const getreview = async (req, res) => {
    const abc = await review.find({ "tour": req.params.id })


    try {
        review.find({ "tour": req.params.id }).populate("user").populate("tour")
            .then(p => res.status(200).json({ data: p }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const createreview = async (req, res) => {
    
    const Review = req.body.review
    const Rating = req.body.rating
    const Tour = req.body.tour
    const User = req.body.user
   
  const checkUser=  await review.findOne({user:User})
 // console.log(checkUser.tour ==Tour)
    if(checkUser){
       
       if(checkUser.tour ==Tour){
         res.status(201).json({ data: "you have already  created on this tour" })
          
       }else{
        res.status(201).json({ data: "review created" })
        // const newReview = new review({ review: Review, rating: Rating, tour: Tour, user: User })
        // await newReview.save()
        // res.status(201).json({ data: newReview })
       }
      
    }else{
        res.status(201).json({ data: "new review" })
        
       // res.status(201).json({ data: "newReview" })
        //    const newReview = new review({ review: Review, rating: Rating, tour: Tour, user: User })
        //    await newReview.save()
          
      }

      // const newReview = new review({ review: Review, rating: Rating, tour: Tour, user: User })
      //  await newReview.save()
      //  res.status(201).json({ data: newReview })

}
const updateReview = async (req, res) => {
    try {
        const Review = req.body.review
        const Rating = req.body.rating
        const Tour = req.body.tour
        const User = req.body.user
        const Id = req.params.id
        const Data = await review.findById(Id)
        console.log(Data)

        if (Data !== null) {
            const updateData = await review.findByIdAndUpdate(Id,{review: Review, rating: Rating, tour: Tour, user: User})
            res.status(200).json({ message: "successfully update" })
        } else {

            res.status(500).json({ message: "your review id dose not exist" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const deleteReview = async (req, res) => {
    try {
        const Id = req.params.id
        const deleteData = await review.findById(Id)

        if (deleteData !== null) {
            await review.findByIdAndDelete(Id)
            res.status(200).json({ message: "successfully deleted" })
        } else {

            res.status(500).json({ message: "your review id dose not exist" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

reviewRouter
    .route("/review")
    .get(getAllreview)
    .post(createreview)



reviewRouter
    .route("/:id/review")
    .get(getreview)

reviewRouter
    .route("/update/:id")
    .put(updateReview)

reviewRouter
    .route("/delete/:id")
    .delete(deleteReview)






module.exports = reviewRouter