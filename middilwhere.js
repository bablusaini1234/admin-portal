
const express= require("express")
const app= express()
const cookieParser= require('cookie-parser')
const morgan= require("morgan")
var a=false;
app.use(cookieParser())
app.use(morgan("tiny"))
function check(req,res,next){
 if(a=true){
  next();
 }else{
  res.send("please correct url")
 }
}

app.get('/',check,(req,res)=>{
    var a=true;
    res.cookie("cookie1","value1")
    res.cookie("cookie2","value2")
    res.cookie("cookie3","value3")
    res.send("wellcome to midilwhere functions")
    
})
app.get('/cookie',check,(req,res)=>{
  
  res.send(req.cookies)
  
})

app.listen(5000,(req,res)=>{
   // console.log("server is running on port 5000")
})