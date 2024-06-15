const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dbs=require("../db/index");
const User=dbs.User;
const TravelPackage=dbs.TravelPackage;
const secretkey="my_server";
router.use(express.json());
const userSignin=require("../middlewares/usersignin");  //This middleware  will be used while signing in to verify if the username exists in the database. We can also retreive the entire user document from it of that username
const userMiddleware=require("../middlewares/user");  //This verifies the jwt token
const saltRounds=10;
const check=require("../middlewares/register");

//First the 'check' middleware checks whether the username is a vlaid format of email id, and the password is of minimum 6 digits.
router.post("/signup",check,async function(req,res){  //Register a user in the database
    const username=req.body.username;
    const password=req.body.password;
    
    const val= await User.create({
        username: username,
        password: await bcrypt.hash(password,saltRounds)
    })

    res.json({
        msg:"The user has been registered in the database"
    });
})

//You'll have to pass the username and password in the body
//Here we will check if the password is correct. If it is correct then, then we return the jwt token. Else we respond with a message that the password is wrong.
router.post("/signin",userSignin,async function(req,res){  //Firstly the userSignin middleware checks if the entered username in the body exists or not. Then only the flow passes to this router function
    const username= req.body.username;
    const password= req.body.password;
    const pass=req.value.password;

    const match=await bcrypt.compare(password,pass);
    if(match){   //If the correct password gets entered then create a jwt token gets returned to the user
        const token=jwt.sign({username:username},secretkey);
        res.json({
            token: token
        });
    }
    else{
        res.json({
            msg:"Incorrect password entered"
        });
    }
})

router.get("/readall",async function(req,res){  //Reads all the travel packages. We don't require the userMiddleware here as anyone can see it.
    const ans= await TravelPackage.find({});
    res.json({
        TravelPackages: ans
    });
})

//User to purchase a travel package
router.put("/purchase",userMiddleware, async function(req,res){  //We get the username from the jwt token. Username is always unique
    const id=req.body.id;  //document _id of the travel package
    const mytoken=req.headers.authorization;
    const myuser=jwt.verify(mytoken,secretkey);
    const username=myuser.username;
    
    const val=await User.updateOne(
        {username:username},
        {
            "$push":{
                purchasedPackage:id
            }
        }
    )

    res.json({
        msg:"The user database has been updated"
    })
})

//Here we first got the user document. Then from the user document, we got the purchasedPackage array. We made a new empty array-'ans'. The purchasedPackage array only has the _id of the travelpackages. So for each id in the array, we found the entire document from travelpackages database, and pushed the entire doucment in the 'ans' array. We respond with the ans array. 
router.get("/readpackage",userMiddleware,async function(req,res){  //This is used get all travel packages bought by the user. We get username from jwt token in authorization
    const mytoken=req.headers.authorization;
    const myuser=jwt.verify(mytoken,secretkey);
    const username=myuser.username;

    const val= await User.find({
        username: username
    });

    const packages=val[0].purchasedPackage;  //By this, I get the array of purchasedPackage
    let ans=[];
    for(let i=0;i<packages.length;i++){
        const myval= await TravelPackage.findOne({
            "_id":packages[i]
        })
        ans.push(myval);
    }


    res.json({
        TravelPackages: ans
    });
})


module.exports=router;

