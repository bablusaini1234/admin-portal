const express = require("express")
const tourRouter = require("express").Router()
tourRouter.use(express.json())
const User = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")
const otpTable = require("../model/otpTable")
let storeData;
let storeId;
let storeOtp;

const check = (req, res, next) => {

    if (req.cookies.token === undefined) {
        res.redirect("/")
    } else {
        next()
    }
}
const checkOtp = (req, res, next) => {

    if (req.cookies.otp === "hello") {
        next()
    } else {
        res.redirect("/")
    }
}
const Homecheck = (req, res, next) => {

    if (req.cookies.token === undefined) {
        next()
    } else {
        res.redirect("/users")
    }
}

// USER SECTION //
const login = async (req, res) => {
    res.clearCookie("otp");
    res.clearCookie("user");
    res.render("userlogin.ejs", { value: "", email: '', password: '' })
}

const signup = async (req, res) => {
    res.clearCookie("otp");
    res.clearCookie("user");
    res.render("usersignup.ejs", { bablu: "" })

}
const loginSubmit = async (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
    const userData = await User.findOne({ email: Email })
    if (userData.email === "admin123@gmail.com") {
        if (userData.password === Password) {
            const Id = userData._id
            var token = jwt.sign({ Id }, 'shhhhh');
            res.cookie('token', token)
            res.clearCookie("otp");
            res.redirect("/users")
        }
    } else {
        if (userData === null) {

            res.render("userlogin.ejs", { value: "your account dose not axist", email: Email, password: Password })
        } else {
            if (userData.password === Password) {
                if (userData.role !== 0) {

                    // const Id = userData._id;
                    // var token = jwt.sign({ Id }, 'shhhhh');
                    //  req.session.token = token
                    res.cookie('otp', "hello")
                    res.cookie('user', Email)
                    const randomNumber = ((Math.random() * 40)) * 90
                    const int = parseInt(randomNumber)
                    const stringOtp = JSON.stringify(int)

                    await User.findByIdAndUpdate(userData._id, { otp: int })
                    // storeOtp=int;
                    // storeId=userData._id;
                    console.log("this is login opt =>", int)
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
                        subject: "login otp",
                        text: stringOtp
                    }
                    transport.sendMail(mailerOption, function (error, info) {

                    })
                    res.redirect("/otp")
                } else {
                    res.render("userlogin.ejs", { value: "you have not authrization", email: Email, password: Password })
                }

            } else {
                res.render("userlogin.ejs", { value: "your password is incorrect", email: Email, password: Password })
            }
        }
    }

}

const otp2 = async (req, res) => {
    res.render("otp2.ejs", { otp: "", value: "", resend: "" })

}
const otp = async (req, res) => {
    res.render("otp.ejs", { otp: "", value: "", resend: "" })

}
const otpSubmit = async (req, res) => {

    const otp = parseInt(req.body.otp)

    try {
        const DataOtp = await User.findOne({ otp: otp })
        if (DataOtp !== null) {
            const Id = DataOtp._id;
            var token = jwt.sign({ Id }, 'shhhhh');
            res.cookie('token', token)
            res.clearCookie("otp");
            res.render("home.ejs")
        } else {
            res.render("otp.ejs", { otp: "incorrect otp", value: otp, resend: "" })
        }
    }
    catch (error) {
        res.render("otp.ejs", { otp: "incorrect otp", value: otp, resend: "" })
    }



}
const resend = async (req, res) => {
    const email = req.cookies.user

    const user = await User.findOne({ email: email })

    const randomNumber = ((Math.random() * 40)) * 90
    const int = parseInt(randomNumber)
    const stringOtp = JSON.stringify(int)
    await User.findByIdAndUpdate(user._id, { otp: int })

    console.log("this is login resend opt =>", int)
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
        subject: "login resend otp",
        text: stringOtp
    }
    transport.sendMail(mailerOption, function (error, info) {
    })
    res.render("otp.ejs", { otp: "", value: "", resend: "resent otp" })
    // res.redirect("/otp")

}

const signupResend = async (req, res) => {
    const email = req.cookies.user
    const otpUser = await otpTable.findOne({ email: email })
    const randomNumber = ((Math.random() * 40)) * 90
    const int = parseInt(randomNumber)
    const stringOtp = JSON.stringify(int)

    await otpTable.findByIdAndUpdate(otpUser._id, { otp: int })

    console.log("this is signup resend opt =>", int)
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
        subject: "signup resend otp",
        text: stringOtp
    }
    transport.sendMail(mailerOption, function (error, info) {
    })
    res.render("otp2.ejs", { otp: "", value: "", resend: "resent otp" })
    // res.redirect("/otp")

}

const logout2 = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/')


}
const signupSubmit = async (req, res) => {

    let { name, email, password, mobile } = req.body;

    let role = 1;
    let status = 1;
    //  const bcryptPassword = bcrypt.hashSync(password, 10)
    res.cookie('otp', "hello")
    res.cookie('user', email)
    const randomNumber = ((Math.random() * 40)) * 90
    const int = parseInt(randomNumber)
    const otpData = new otpTable({ name: name, email: email, password: password, role: "1", status: "1", mobile: mobile, otp: int })

    await otpData.save()
    const stringOtp = JSON.stringify(int)

    console.log("this is signup opt =>", int)
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
        subject: "signup otp",
        text: stringOtp
    }
    transport.sendMail(mailerOption, function (error, info) {

    })
    res.redirect("/Createotp")
    // const userData = new User({ name: name, email: email, password: password, role: role, status: status, mobile: mobile })
    //     await userData.save()
    //     res.redirect("/")
}

const otp2Submit = async (req, res) => {
    const otp = req.body.otp
    const getOtp = await otpTable.findOne({ otp: req.body.otp })


    if (getOtp !== null) {
        if (req.cookies.user === getOtp.email) {
            const userData = new User({ name: getOtp.name, email: getOtp.email, password: getOtp.password, role: "1", status: "1", mobile: getOtp.mobile })
            await userData.save()

            res.redirect("/")
        } else {

        }

    } else {
        res.render("otp2.ejs", { otp: "incorrect otp", value: otp, resend: "" })
    }

}
const userHome = async (req, res) => {
    res.clearCookie("user");
    const limitData = await User.find().limit(5)
    const userallData = await User.find()
    const length = userallData.length


    const devideLength = length / 5;
    const int = parseInt(devideLength)
    if (length % 5 === 0) {
        res.render("userHome.ejs", { userallData: limitData, length: int })
    } else {
        res.render("userHome.ejs", { userallData: limitData, length: int + 1 })
    }

}

const fatch = async (req, res) => {

    const skipData = await User.aggregate([{ $match: { name: 'bablu' } }, { $sort: { name: 1 } }])

    res.json(skipData)
}

const update = async (req, res) => {
    const Id = req.params.id
    const IdData = await User.findById(Id)
    res.render("usersignup.ejs", { bablu: IdData })
}

const updateuser = async (req, res) => {
    const Id = req.params.id

    let role = 1;
    let status = 1;
    let { name, email, password, mobile } = req.body;
    const userData = await User.findByIdAndUpdate(Id, { name: name, email: email, password: password, role: role, status: status, mobile: mobile })
    res.redirect("/users")

}

const deleteuser = async (req, res) => {
    const Id = req.params.id
    const userData = await User.findByIdAndDelete(Id)
    res.redirect("/users")

}

const index = async (req, res) => {

    res.render("home.ejs")

}


const count = async (req, res) => {
    const Id = req.params.id;
    const length = (await User.find()).length
    const devideLength = length / 5;

    var skip;

    if (Id <= "1") {
        if (length % 5 === 0) {
            skip = 0
            const userallData = await User.find().skip(skip).limit(5)
            res.render("userHome.ejs", { userallData: userallData, length: devideLength })

        } else {
            skip = 0
            const userallData = await User.find().skip(skip).limit(5)
            res.render("userHome.ejs", { userallData: userallData, length: devideLength + 1 })
        }

    } else {
        if (length % 5 === 0) {
            skip = (Id - 1) * 5
            const userallData = await User.find().skip(skip).limit(5)
            res.render("userHome.ejs", { userallData: userallData, length: devideLength })

        } else {
            skip = (Id - 1) * 5
            const userallData = await User.find().skip(skip).limit(5)
            res.render("userHome.ejs", { userallData: userallData, length: devideLength + 1 })
        }
    }
}


tourRouter
    .route("/")
    .get(Homecheck, login)
    .post(loginSubmit)


tourRouter
    .route("/signup")
    .get(Homecheck, signup)
    .post(signupSubmit)

tourRouter
    .route("/otp")
    .get(checkOtp, otp)
    .post(otpSubmit)

tourRouter
    .route("/Createotp")
    .get(checkOtp, otp2)
    .post(otp2Submit)

tourRouter
    .route("/resend")
    .get(resend)
tourRouter
    .route("/signupResend")
    .get(signupResend)

tourRouter
    .route("/users")
    .get(check, userHome)

tourRouter
    .route("/fatch")
    .get(fatch)

tourRouter
    .route("/index")
    .get(check, index)

tourRouter
    .route("/count/:id")
    .get(count)

tourRouter
    .route("/update/:id")
    .get(update)

tourRouter
    .route("/signup/:id")
    .post(updateuser)
    .get(deleteuser)
tourRouter
    .route("/delete/:id")
    .get(deleteuser)

tourRouter
    .route("/logout2")
    .get(logout2)







module.exports = tourRouter

