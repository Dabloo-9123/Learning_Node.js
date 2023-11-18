const dbConnection = require("./public/mongodb")


const updateData=async ()=>{
let data= await dbConnection()
let result= await data.updateMany({type:"nm3"},{$set:{"name":"mp44"}})
console.log(result);
}
updateData()