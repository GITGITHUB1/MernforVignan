const express=require('express');
const bodyparser=require('body-parser');
const app=express();

const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });

//Attach the connection file 
require('./db.js');

//Middleware to change the user's data into Javascript Object
app.use(express.json());

//Require the Routers
require('./router/auth.js');

//Listening to PORT
app.listen(5000,()=>{
    console.log(`Server running at 5000`);
    
})