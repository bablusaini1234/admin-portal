const ErrorRouter2 = require("express").Router();
const AppError= require("../errors/AppError")

const errorDev = (err, res) => {
    
    res.status(400).json({
        status: err.status,
        message: err.message,
        stack:err.stack
 });
}

const errorPro = (err, res) => {
    if(err.isOperational==true){
        res.status(400).json({
            status: err.status,
            message: err.message,
     })
    }else{
        res.status(400).json({
            status:"error",
            message: "something went very wrong"
    })
      
}}
module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500
    err.status = err.status || 'error'
    if(process.env.Node_ENV==='development'){
        errorDev(err,res)
       }
    else if(process.env.Node_ENV==='production'){
        errorPro(err,res)
    }
   
    // res.status(err.statuscode).json({
    //     status: err.status,
    //     message: err.message,
       
    // })
};



