// const http = require("http");
// const { data } = require("./data");

const dbConnection = require("./public/mongodb");

// http.createServer((req,res)=>{
//     res.writeHead(200,{'contnt_type':"Application/JSON"})
//     res.write(JSON.stringify(data))
//     res.end();

// }).listen(5000)

// console.log(process.argv[2])


// creting multiple file in a folder

// const fs=require("fs");
// const path=require("path");
// const dir_path=path.join(__dirname,"files");

// for(var i=0;i<5;i++)
// {
//     // fs.writeFileSync(dir_path+"/hello" +i+".txt","this is the text inside file")

   
// }
// fs.readdir(dir_path,(err,files)=>{
//     files.forEach((item)=>{
//         console.log(item)
//     })
// })

// ?nodemon.js Async example
// let a =10;
// let b= 20;

// console.log(a+b)

// let waitingdata=new Promise((res,rej)=>{
//     setTimeout(() => {
//         b=50
//         res(b)
//     }, 2000);
// })
// waitingdata.then((result)=>{
//     console.log(a+result)
// })


// Express

// const express= require("express")

// const app=express();

// app.get('',(req,res)=>{
//     res.send("<h1>This is Home Page</h1>")
// })
// app.get('/about',(req,res)=>{
//     res.send(`
//     <input type="text" placeholder="Enter name" value="${req.query.name}"/>
//     <button>Submit</button> `)
// })
// app.get('/help',(req,res)=>{
//     res.send("Hello this is Help Page")
// })

// app.listen(3000,()=>{
//     console.log("Server is live at port number 3000")
// })

// connect html file with express.js

// const { log } = require("console");
// const express=require("express");
// const path=require('path');


// const app = express();

// const aboutpath=path.join(__dirname,'public')
// console.log(aboutpath);
// // app.use(express.static(aboutpath))
// app.get('',(req,res)=>{
//     res.sendFile(`${aboutpath}/index.html`)
// })
// app.get('/about',(req,res)=>{
//     res.sendFile(`${aboutpath}/about.html`)
// })

// app.get('*',(req,res)=>{
//     res.sendFile(`${aboutpath}/404pagenotfount.html`)
// })

// app.listen(5000,()=>{
//     console.log("server is running on port number 5000")
// })


// example for express js ejs for creating dynamic applications

// const { log } = require("console");
// const express=require("express");
// const app = express();
// app.set('view engine','ejs')
// app.get('/user',(req,res)=>{
//     const datauser={
//             name:"Dabloo Kumar",
//             email:"dabloo@code.com",
//             city:"Bangalore"
//     }
//     res.render('profile',{datauser})
// })
// app.listen(5000,()=>{
//     console.log("server is running on port number 5000")
// })

// middleware


// const express=require('express')
// const filterreq=require('./middleware')
// const app = express();

// const route=express.Router();
// route.use(filterreq)

  
 
// // app.use(filterreq)


// app.get('/',filterreq,(req,res)=>{
//     res.send("Welcome to the home page")
// })
// app.get('/users',(req,res)=>{
//     res.send("Welcome to the users page")
// })
// app.get('/contact',filterreq,(req,res)=>{
//     res.send("Welcome to the contact page")
// })

// app.listen(5000,()=>{
//     console.log("The server is running at port number 5000");
// })
// app.use('/',route)


// mongo db connection with node.js  not working
// const {MongoClient}=require('mongodb')

// const url="mongodb://127.0. 0.1:27017"
// const client=new MongoClient(url)
// const database="Ecomm"

//   async function getData(){
//     let result= await client.connect();
//     let dbms=result.db(database);
//     let collection=dbms.collection('product');
//     let response= await collection.find().toarray();

//     // console.log(await collection.find().toarray())
//     // console.log("connection succesful");
//     console.log((response));
//   }


// 2nd attemt created connection in mongodb.js and by importing we are using here bye using
// promise as well as async await

// dbConnection().then((result)=>{
//   result.find().toArray().then((data)=>{
//     console.log(data);
//   })
// })

// let main = async ()=>{
// let data= await dbConnection();
// data= await data.find().toArray();
// console.log(data);
// }
// main()

// ********** mongoose ************

const mongoose= require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Database")
    const DataSchema=new mongoose.Schema({
        name:String,
        phone:Number,
        branch:String
    })

const saveInDb= async ()=>{
   
    const DataModel= mongoose.model('employees',DataSchema)
    let data=new DataModel({name:"Sana",branch:"EEE",phone:7250546859})
    let result= await data.save();
    console.log(result);

}
// saveInDb()
const updateInDb=async ()=>{
    const product=mongoose.model('employees',DataSchema)
    let data = await product.updateOne(
        {name:"Dabloo Kumar"},
        {$set:{"phone":7870476846}}
    )
    console.log(data)
}
// updateInDb()
const deleteInDb= async()=>{
    let product=  mongoose.model('employees',DataSchema)
    let data= await product.deleteOne({name:"Sana"})
    console.log(data);
}
// deleteInDb()

const findInDb=async ()=>{
    let product=mongoose.model('employees',DataSchema)
    let data= await product.find({})
    console.log(data);
}
// findInDb()

// crud operation using mongonees

const express=require('express')
require('./config');
const product=require('./product');

const app=express()
app.use(express.json())

app.post('/',async (req,res)=>{
    let data=new product(req.body)
    let result=await data.save()
    console.log(result);
    res.send(result)
})

app.get('/list', async (req,res)=>{
  let data = await product.find();
  res.send(data)
})

app.delete('/delete/:_id',async (req,res)=>{
    let data= await product.deleteOne(req.params)
    console.log(req.params);
    res.send(data)
})

app.put('/update/:_id',async (req,res)=>{
    let data= await product.updateOne(
        req.params,
        {$set:req.body}
    )
    res.send(data)
})
app.get('/search/:key',async (req,res)=>{
    console.log(req.params.key);
    let data=await product.find(
        {
            "$or":[
                {"name":{$regex:req.params.key}},
               
                {"branch":{$regex:req.params.key}}
            ]
        }
    )
    res.send(data)
    // console.log(data);
})
app.listen(5000,()=>{
    console.log("Server is live at port number 5000");
})