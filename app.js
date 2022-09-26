const express = require("express")
const app = express()
const fs = require("fs")
// const readFile = fs.readFileSync(__dirname + "/data/data1.json", 'utf8')
// const jsonObj = JSON.parse(readFile)
app.use(express.json())
const path = require("path")
const pathname = path.join(__dirname, "data")
const apiRouter = require('./routers/apiRouter');
const userRouter = require('./routers/userRouter');
const user = require('./routers/user');
const tour = require('./routers/tour');
const overview = require('./routers/overview');
const review = require('./routers/review');
const session = require("express-session");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const rateLimit = require('express-rate-limit')
//  const helmet = require("helmet");
 const mongoSanitization= require("express-mongo-sanitize")
const xss= require("xss-clean")
const limiter = rateLimit({
    max: 2,
	windowMs: 60 * 60 * 1000,
    message:"to many request from  this IP, please try again in an hours" 
})

app.use('/api', limiter)

//  app.use(helmet());
app.use(mongoSanitization())
app.use(xss())
const dotenv = require("dotenv").config()
const mongoose= require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/tour",()=>{
    console.log("tour database is connect")
    
})

app.use(express.urlencoded({ extended: "false" }))
app.set("view engine", "ejs")
app.use(session({
    secret: "bablu",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));



app.use(express.static("public"))
app.use(apiRouter)
app.use(userRouter)
app.use(tour)
app.use(review)
app.use(user)
app.use(overview)
app.all('*', (req, res, next) => {
    res.send(`<h2>url ${req.originalUrl} dose not found</h2>`)
});


//  let arry=[1,2,3,4,5]
//  let arr2=[]
// for(let i=arry.length-1;i>=0;i--){
 
//     arr2.push(arry[i])
//   console.log(arr2)
// }



// let arr =[1,2,3,4,5,6,7,8,9,10]
// let n= arr.filter((p)=>{
//  return result= p%2==0
   
// })
// console.log(n)

// let arr =[1,2,3,4,5,6,7,8,9,10]
// let even=[]
// let odd=[]
// for(var i = 0; i < arr.length; i++){
//     if(arr[i]%2==0){
        
//        even.push(arr[i])
//     }else{
//         odd.push(arr[i])
//     }
// }

// console.log(even)
// console.log(odd)

// app.use(errorRouter2)

app.listen(process.env.PORT, (req, res) => {
 

})




