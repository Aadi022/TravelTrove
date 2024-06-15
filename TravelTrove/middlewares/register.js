//This middleware will incorporate zod. This will be used when a new user is registering, and will be called in "/signup" route for admin and user
//This will check if the user has entered valid format of username, and the password is minimum of 5 letters

const zod=require("zod");


function check(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    const schema=zod.object({     //This is the schema for zod verification. Basically, such template must be passed while safeParsing.
        email:zod.string().email(),
        password:zod.string().min(6)
    })

    const temp={    //Creating a json element to safeParse username and password, which we got from the body
        email: username,
        password: password
    }

    const ans=schema.safeParse(temp);
    if(ans.success){
        next();
    }
    else{
        res.json({
            msg:"Enter valid format of username and password. The username should be an email address and password should be minimum of 6 letters"
        })
    }
}

module.exports=check;
