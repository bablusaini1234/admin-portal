const apiRouter = require("express").Router()
const fs = require("fs")
// const readFile = fs.readFileSync("../express/data/data1.json", 'utf8')
// const jsonObj = JSON.parse(readFile)



// const getAllData = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         results: jsonObj.length,
//         data: jsonObj
//     })
    
// }
// const getData = (req, res) => {
//     const id = parseInt(req.params.id)
//     try {
        
//         const iddata = jsonObj2.find(el => el.id === id);
//         if( iddata !==undefined){
//             res.status(200).json({
//                 status: "ok",
//                 data: { iddata }
//          })
//         }else{
//             res.status(404).json({
//                 status: "error",
//                 data: { message:"id is not defined" }
//          })
//         }
//         } 
//         catch (error) {
//         res.status(500).json({ message:error.message})
//     }

// }

// const createData =(req, res) => {

//     const newid = jsonObj[jsonObj.length - 1].id + 1;
//     const newobjData = Object.assign({ id: newid }, req.body);
//      jsonObj.push(newobjData)
    
//     const createdData = fs.writeFileSync("../express/data/data1.json", JSON.stringify(jsonObj))
//     res.status(201).json({
//         status: "created",
//         data: { newobjData }
//     })
// }

// const UpdateData = (req, res) => {
//     const iddata = [{ 'id': parseInt(req.params.id), "name": req.body.name }]
//     var res = jsonObj.map(obj => iddata.find(o => o.id === obj.id) || obj);
//     const createdData = fs.writeFileSync("../express" + "/data" + "/" + "data1" + ".json", JSON.stringify(res));
// }



// // app.get("/api", getAllData)
// // app.post("/api", createData)
// // app.get("/api/:id", getData)
// // app.put("/api/:id", UpdateData)

// apiRouter
//     .route("/api")
//     .get(getAllData)
//     .post(createData)

// apiRouter
//     .route("/api/:id")
//     .get(getData)
//     .put(UpdateData)




module.exports = apiRouter