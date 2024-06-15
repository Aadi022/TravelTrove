//This middleware finds the username in User Database and passes the entire document of the username(which is val) to the routing function that calls this middleware
const bcrypt=require("bcryptjs");
const dbs=require("../db");
const User=dbs.User;

async function userSignin(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    const val=await User.findOne({
        username:username
    })

    if(val){
        req.value=val;
        next();
    }
    else{
        res.json({
            msg:"Username does not exist"
        });
    }
} 

module.exports=userSignin;