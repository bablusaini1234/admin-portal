const express = require("express")
const userRouter = require("express").Router()
const fs = require("fs")
userRouter.use(express.json())
// const readFile = fs.readFileSync("../express/data/userData.json", "utf8")
// const jsonData = JSON.parse(readFile);
userRouter.use(express.static('public')); 
// const catchError= require("../errors/catchError")
// var sess;




// function check(req, res, next) {
//     if (req.session.isAuth === true) {
//         next();
//     } else {
//         res.redirect("/")

//     }
// }


// const getAllUsers = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: "this route is not defined"
//     })
// }
// const getUser = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: "this route is not defined"
//     })
// }
// const createUser = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: "this route is not defined"
//     })
// }
// const updateUser = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: "this route is not defined"
//     })
// }
// const login = async(req, res) => {

//     const cookieValue = req.cookies.login

//     if (cookieValue === "true") {
//         res.redirect("/next")

//     } else {
//         res.render("login.ejs", { message: "bablu", Email: "", password: "" })
//     }


// }
// const create = (req, res) => {
//     res.render("create.ejs")

// }



// //const createData = catchError (async(req, res,next) 
// const createData =async(req, res)=> {
   
//     const id = jsonData[jsonData.length - 1].id + 1;
//     const createData = Object.assign({ id: id }, req.body);
    
//    jsonData.push(createData)
//    const createdData = fs.writeFileSync("../express/data/userData.json", JSON.stringify(jsonData))
//     res.redirect("/")

// };

// const checklogin = (req, res) => {

//     const mail = req.body.mail;
//     const pass = req.body.pass;
//     const findData = jsonData.find(el => el.email === mail)
  
//     // sess=req.session;
//     // sess.userid=mail


//     if (findData) { // when an account exists
//         if (findData.password == pass) {

//             res.cookie('login', true)
//             req.session.isAuth = true;


//             res.redirect("/next")

//         } else {
//             res.render("login.ejs", { message: "your password is incorrect", Email: mail, password: pass })

//         }

//     } else {

//         res.render("login.ejs", { message: "your account dose not exists", Email: mail, password: pass })
//     }

// }


// const logout = (req, res) => {
//     res.cookie('login', false)
//     req.session.destroy()
//     res.redirect("/")
// }



// userRouter
//     .route("/login")
//     .get(login)
//     .post(checklogin)

// userRouter
//     .route("/create")
//     .get(create)
//     .post(createData)


// userRouter

//     .route("/logout")
//     .get(logout)


module.exports = userRouter


