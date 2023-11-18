const {MongoClient}=require('mongodb')
const url='mongodb://127.0.0.1:27017';
let database='youtube'
const client=new MongoClient(url);

async function dbConnection(){
  let result = await client.connect()
  let db=result.db(database)
  return db.collection('audio');
  // let response= await collection.find({"type":"mp3"}).toArray()
  // console.log(response);
}
module.exports=dbConnection;