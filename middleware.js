module.exports= filterreq=(req,res,next)=>{
    // console.log("request filtered");
    if(!req.query.age)
    {
        res.send("Please enter your age")
    }
    else if(req.query.age <18)
    {
        res.send("You cannot acces this web page because your age is less than 18 whis is comes in the category of underage")
    }
   else{
    next();
   }
}