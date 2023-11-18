const { ServerDescriptionChangedEvent } = require('mongodb')
const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    phone:Number,
    branch:String
})

module.exports= mongoose.model('employees',productSchema)