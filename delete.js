const dbConnection = require("./public/mongodb")


const delete_data= async ()=>{
    let data= await dbConnection();

    let result=await data.deleteMany({"type":"nm3"})
    if(result.acknowledged){
        console.log("data deleted");
    }
}
delete_data()