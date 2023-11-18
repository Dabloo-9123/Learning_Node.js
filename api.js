const express = require("express");
const mongodb=require("mongodb")
const dbConnection = require("./public/mongodb");

const app = express();
app.use(express.json())

app.get("/", async (req, res) => {
    let data= await dbConnection();
    data= await data.find().toArray()
  res.send(data);
  console.log(data);
});

app.post("/",async (req,res)=>{
    let data= await dbConnection()
    let result= await data.insertOne(req.body)
    res.send(result)
    // console.log(req.body);
})

app.put("/:name", async (req,res)=>{
    let data=await dbConnection();
    let result=await data.updateOne({type:req.params.name},{$set:req.body})
    res.send(result)
})

app.delete("/:id",async (req,res)=>{
    const data= await dbConnection()
    let result= await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    console.log(req.params.id);
    res.send(result)
})

app.listen(5000, () => {
  console.log("server is live at port number 5000");
});
