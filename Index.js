const express=require('express');
require('dotenv').config();
const cors=require('cors');
const connection = require('./Config/db');
const UserRouter = require('./Routes/UserRoute');
const app=express();

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))

app.use(express.json());
app.get('/',(req,res)=>(
      res.send('welcome')    
))

app.use('/user',UserRouter);




app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("Port started at ",process.env.PORT);
    } catch (error) {
        console.log(error);
    }
})