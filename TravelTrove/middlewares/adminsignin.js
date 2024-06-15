//This middleware finds the username in Admin Database and passes the entire document of the username(which is val) to the routing function that calls this middleware
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const dbs=require("../db/index");
const Admin=dbs.Admin; 


async function adminsignin(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    const val=await Admin.findOne({
        username: username
    });

    //console.log(val);

    if(val){
        req.value=val;  //Passing val to the routing function which calls this middleware. Hence after next() is done, val can be accessed by that routing function
        next();
    }
    else{
        res.json({
            msg:"Username does not exist"
        })
    }
} 

module.exports=adminsignin;