const User = require('../model/userSchema');
require('../db');
const helper=require('./helper.js');
const express = require('express');
const app = express();

//Get Router
app.get('/users', async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
})

//Signup Page
app.post('/register', async (req, res) => {
  try {
    const { name, email, age, worktype, password, confirmpassword } = req.body;
    //Check the user already exists or not
    const ifExist = await User.findOne({ email: email });
    if (ifExist) {
      res.status(400).json({ message: 'User already exists' });
    }
    //To check password and confirmpassword
    if (password !== confirmpassword) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
    //Hashing the password
const hashedPassword=await helper.hashPassword(password);
    //Save the data in the database
    const data = new User({ name, email, age, worktype, password:hashedPassword, confirmpassword });
    const response = await User.save(data);
    if (response) {
      res.status(200).send(data);
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
})


//Login Router
app.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      res.status(400).json({message:'Please fill all the credentials'});
    }
    //Check the email from the database
    const exist=await User.find({email:email});
    if(exist){
      res.status(200).json({message:'Successfully Logged IN'});
    }
  
  }
  catch(err){
    res.status(500).send(err);
  }
})