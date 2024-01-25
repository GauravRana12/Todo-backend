const express=require('express');
const UserModel = require('../Modals/User.model');
var UserRouter=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { Authenticate } = require('../Middleware/Authenticate');

UserRouter.post('/signup',async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingCheck=await UserModel.findOne({email});
        
        if(existingCheck){
            const message="User Already Exists"
        return    res.send(message);
        }
        else{
            bcrypt.hash(password, 5, async function (err, hash) {
                await UserModel.create({name,email,password:hash});
                res.send("Registered successful");
              });
        }
    } catch (error) {
        console.log(error);
    }
})

UserRouter.get('/',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        const userDetails=await UserModel.findOne({_id:userId});
        if(userDetails){
            return res.send(userDetails);
        }
        else{
            return res.send("No User Found");
        }
    } catch (error) {
        console.log(error);
    }
})


UserRouter.post('/login',async (req,res)=>{
    try {
        const { email, password } = req.body;
    console.log(email,password);
    let userData = await UserModel.findOne({ email: email });
    if (!userData) {
      return res.send({message:"User Not Registered"});
    } else {
      bcrypt.compare(password, userData.password, async function (err, result) {
        if (err) {
          return res.send({message:"wrong password"});
        } else {
          const userObj = {
            userId: userData._id,
          };
          var token = jwt.sign(userObj, "secret");
          res.send(token);
        }
      });
    }

    } catch (error) {
        console.log(error);
    }
})


module.exports=UserRouter