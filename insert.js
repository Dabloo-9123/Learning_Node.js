const dbConnection = require("./public/mongodb");

const insertdata=async ()=>{
    let db= await dbConnection();

    let result=await db.insertMany([
        {type:"nm4",duration:"60min"},
        {type:"nm5",duration:"70min"},
        {type:"nm6",duration:"80min"}
    ])
    if(result.acknowledged==true)
    {
        console.log("data inserted")
    }
}
insertdata()