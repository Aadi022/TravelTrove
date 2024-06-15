const secretkey="my_server";
const jwt=require("jsonwebtoken");
//middleware to verify jwt token for User

function userMiddleWare(req,res,next){
    const token=req.headers.authorization;
    try{
        const ans=jwt.verify(token,secretkey);
        next();
    }
    catch{
        res.json({
            msg:"Unauthorized user"
        })
    }
}

module.exports=userMiddleWare;