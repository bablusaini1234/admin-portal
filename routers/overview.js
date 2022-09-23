const overviewRouter = require("express").Router()
const Tour = require("../model/tour")
const User = require("../model/user")
const Gallery = require("../model/gallery")
const jwt = require('jsonwebtoken');
const multer = require("multer");
const booking = require("../model/booking");
const nodemailer = require("nodemailer")
const ejs = require("ejs")
const path = require("path")
//var upload = multer({dest:'public/'});

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
var upload = multer({
    storage: Storage,
    limits: { fileSize: 1024 * 1024 * 10 }
})

const check = (req, res, next) => {

    if (req.cookies.token === undefined) {
        res.redirect("/notfound")
    } else {
        next()
    }
}

const signup = async (req, res) => {
   
    res.render("TouruserSignup.ejs")

}

const signupSubmit = async (req, res) => {
   
    let { name, email, password, mobile } = req.body;

    let role = 1;
    let status = 1;

    const userData = new User({ name: name, email:email, password:password, role: "1", status: "1", mobile: mobile })
   await userData.save()
  res.redirect("/tourLogin")

}

const overview = async (req, res) => {

    if (req.cookies.token) {
        const token = req.cookies.token
        const verify = jwt.verify(token, 'shhhhh')
        const Username = await User.findById(verify.Id)
        const Tourdata = await Tour.find()
        res.render("overview", { tour: Tourdata, name: Username.name })
    } else {
        const Tourdata = await Tour.find()
        res.render("overview", { tour: Tourdata, name: "" })
    }


}

const tours = async (req, res) => {
    const token = req.cookies.token
    const verify = jwt.verify(token, 'shhhhh')
    const Username = await User.findById(verify.Id)
    const Id = req.params.id
    const Tourdata = await Tour.findById(Id)
    res.render("tours", { tour: Tourdata, name: Username.name })
}

const tourLogin = async (req, res) => {
    res.render("tourLogin.ejs", { value: "", email: "", pass: "", tour: "", name: "", })
}
const tourLogout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/tourLogin")
}

const tourLoginSubmit = async (req, res) => {
    const email = req.body.mail
    const pass = req.body.pass
    const userData = await User.findOne({ email: email })

    if (userData !== null) {

        if (userData.password !== null) {
            const Id = userData._id;
            var token = jwt.sign({ Id }, 'shhhhh');
            res.cookie('token', token)
            res.redirect("/overview")

        } else {
            res.render("tourLogin.ejs", { value: "your password is incorrect", email: email, pass: pass ,name:""})
        }
    } else {
        res.render("tourLogin.ejs", { value: "your account dose not axist", email: email, pass: pass ,name:""})
    }

}

const notfound = async (req, res) => {
    res.render("notFound.ejs")
}
const userDetails = async (req, res) => {
    const token = req.cookies.token
    const verify = jwt.verify(token, 'shhhhh')
    const Username = await User.findById(verify.Id)
    res.render("userDetails", { user: Username })
}
const userDetailsSubmit = async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const token = req.cookies.token
    const verify = jwt.verify(token, 'shhhhh')
    const Username = await User.findByIdAndUpdate(verify.Id, { name: name, email: email })
    res.redirect("/overview")

}

const gallery = async (req, res) => {
    const image = await Gallery.find()
    res.render("bookingShow.ejs")
    //    res.render("gallery.ejs",{image})

}

// const gallerySubmit = async (req, res) => {
//    const img= req.file.filename
//    console.log(img)
//    const image= new Gallery({image:img})
//    await image.save()
//    res.redirect("/gallery")

//  }

const gallerySubmit = async (req, res) => {
    const img = req.files
    for (let i = 0; i < img.length; i++) {
        const imageName = img[i];

        const image = new Gallery({ image: imageName.filename })
        await image.save()
    }
    res.redirect("/gallery")

}

const Booking = async (req, res) => {
    const tourId = req.params.id
    const token = req.cookies.token
    const verifyToken = jwt.verify(token, "shhhhh")
    const userId = verifyToken.Id


    const bookingDetails = new booking({ tour: tourId, user: userId, payment: false })
    
    await bookingDetails.save()
    const idData = await booking.findById(bookingDetails._id).populate("user").populate("tour")

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'bablusaini@cloveritservices.com',
            pass: "Bablu@123"
        }

    });
    const mailerOption = {
        from: 'bablusaini@cloveritservices.com',
        to: 'bablusaini@cloveritservices.com',
        subject: "Tour details",
        html: JSON.stringify(idData)
    }
    transport.sendMail(mailerOption, function (error, info) {

    })
    res.render("successBook.ejs")
}

const getBooking = async (req, res) => {
    const token = req.cookies.token
    const verify = jwt.verify(token, 'shhhhh')
    const Username = await User.findById(verify.Id)
    const bookingData = await booking.find({user:verify.Id}).populate("user").populate("tour")
    
    
    res.render("booking.ejs",{name:Username.name,value:bookingData})

}


overviewRouter
    .route("/overview")
    .get(overview)

overviewRouter
    .route("/tourLogin")
    .get(tourLogin)
    .post(tourLoginSubmit)

overviewRouter
    .route("/tourSignup")
    .get(signup)
    .post(signupSubmit)


overviewRouter
    .route("/tourLogout")
    .get(tourLogout)


overviewRouter
    .route("/tours/:id")
    .get(check, tours)

overviewRouter
    .route("/notfound")
    .get(notfound)

overviewRouter
    .route("/userDetails")
    .get(userDetails)
    .post(upload.single('img'), userDetailsSubmit)

// overviewRouter
//     .route("/gallery")
//     .get(gallery) 
//     .post(upload.single('img'), gallerySubmit)


overviewRouter
    .route("/gallery")
    .get(gallery)
    .post(upload.array('img', 5), gallerySubmit)

overviewRouter
    .route("/booking")
    .get(getBooking)


overviewRouter
    .route("/booking/:id")
    .post(Booking)


module.exports = overviewRouter