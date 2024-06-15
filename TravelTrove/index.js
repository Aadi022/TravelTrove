const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");
const port=3005;
const secretkey="my_server";

app.use(bodyParser.json()); 
app.use("/admin",adminRouter);  //When /admin route is encoutered, the program flow will go to adminRouter, which will handle the nested routes
app.use("/user",userRouter);   //When /user route is encoutered, the program flow will go to userRouter, which will handle the nested routes


app.listen(port,function(){
    console.log("The server is running on port number ",port);
})

module.exports=secretkey;