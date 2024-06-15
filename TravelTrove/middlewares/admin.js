//Middleware to verify the jwt token
const secretkey="my_server";
const jwt=require("jsonwebtoken");

function adminMiddleWare(req,res,next){
    const token=req.headers.authorization;
    try{
        const ans=jwt.verify(token,secretkey);
        next();
    }
    catch{
        res.json({
            msg:"Admin Unauthorized"
        })
    }
}

module.exports=adminMiddleWare;