
const jwt=require('jsonwebtoken');
const Authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log("auth",token);
    jwt.verify(token,'secret',async function(err,decode){
        if (err) {
            console.log("error",err);
            return res.send({message:"Login First"});
        }
        else{
            req.userId=decode.userId;
            next();
        }
        
    })
}
module.exports={Authenticate}