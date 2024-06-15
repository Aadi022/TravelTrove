//This will handle all functionalities for routes after /admin/
const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const adminMiddleWare=require("../middlewares/admin");
const saltRounds=10;
const dbs=require("../db/index");
const Admin=dbs.Admin;
const TravelPackage=dbs.TravelPackage;
router.use(express.json());
const secretkey="my_server";
const adminsingin=require("../middlewares/adminsignin");
const check=require("../middlewares/register");

//Route to sign up. Will store the username in db as it is and store the hashed password in the db
router.post("/signup",check,async function(req,res){  //First the 'check' middleware checks whether the username is a valid format of email id, and the password is of minimum 6 digits.
    const username=req.body.username;
    const password=req.body.password;
    const val=await Admin.create({
        username: username,
        password: await bcrypt.hash(password,saltRounds)
    });
    res.json({
        msg: "The username and password is updated in the database"
    })
});

router.post("/signin",adminsingin, async function(req,res){  //The middleware adminsignin requires the username and password to be passed in the body
    const username=req.body.username;
    const password=req.body.password;
    const pass=req.value.password;  //got this from the middleware
    const ans=await bcrypt.compare(password,pass);
    if(ans){
        const token=jwt.sign({username:username},secretkey);
        res.json({
            token:token
        });
    }
    else{
        res.json({
            msg:"Incorrect password entered"
        })
    }
    
});

router.post("/createpackage",adminMiddleWare,async function(req,res){  //Admin can create a package
    const destination=req.body.destination;
    const numberofdays=req.body.numberofdays;
    const price=req.body.price;
    const description=req.body.description;

    const val=await TravelPackage.create({
        Destination: destination,
        Number_of_days: numberofdays,
        Price: price,
        Description: description
    });

    res.json({
        msg:"The new package has been created and updated in the database"
    });
});


router.put("/update/days",adminMiddleWare,async function(req,res){  //Update Number_of_days of the given id
    const id=req.body.id;
    const numberofdays=req.body.numberofdays;

    const val= await TravelPackage.updateOne(
        {"_id":id},
        {"$set":{
            Number_of_days:numberofdays
        }}
    );

    res.json({
        msg: "The Travel Package has been updated in the database"
    });
})

router.put("/update/price",adminMiddleWare,async function(req,res){  //Update Price of the given id
    const id=req.body.id;
    const price=req.body.price;

    const val= await TravelPackage.updateOne(
        {"_id":id},
        {"$set":{
            Price: price
        }}
    );

    res.json({
        msg: "The Travel Package has been updated in the database"
    });
})

router.put("/update/description",adminMiddleWare,async function(req,res){ //Update Description of the given id
    const id=req.body.id;
    const description=req.body.description;

    const val=await TravelPackage.updateOne(
        {"_id":id},
        {"$set":{
            "Description":description
        }}
    );

    res.json({
        msg:"The Travel Package has been successfully updated in the database"
    });
})

router.delete("/delete",adminMiddleWare,async function(req,res){  //Delete the id given in the body
    const id=req.body.id;

    const val=await TravelPackage.deleteOne(
        {"_id":id}
    );

    res.json({
        msg: "The Travel Package of the given ID has been deleted"
    });
})

router.get("/readall", async function(req,res){  //Didn't add the adminMiddelware here as most websites don't require you to login to see all travelpackages
    const val=await TravelPackage.find({});   //Get all packages
    res.json({
        travelpackages:val
    });
})

router.get("/read", async function(req,res){   //Get the travel package of the given id
    const id=req.body.id;
    const val=await TravelPackage.findOne({
        "_id":id
    });

    res.json({
        travelpackage:val
    });
})

module.exports=router;