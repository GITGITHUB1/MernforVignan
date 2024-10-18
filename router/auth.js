const User = require('../model/userSchema');
require('../db.js');
const helper=require('./helper.js')
const express = require('express');
const router = express.Router();

//Get Router
router.get('/users', async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).send(data);
  }
  catch (err) {
    return res.status(500).json({ message: err });
  }
})

//Signup Page
router.post('/register', async (req, res) => {
  const { name, email, age, workType, password, confirmpassword } = req.body;
  //Check if either of the param is empty or not
  if (!name || !email || !age || !workType || !password || !confirmpassword){
    return res.status(401).json({ error: "Plz fill the details carefully" });
  }
  //Check the user already exists or not
  const ifExist = await User.findOne({ email: email });
  if (ifExist) {
    return res.status(400).json({ message: 'User already exists' });
  }
  //To check password and confirmpassword
  if (password !== confirmpassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  //Hashing the password
   const hashedPassword=await helper.hashPassword(password)
   if(!hashedPassword){
    console.log('Password not hashed');

   }
  //Save the data in the database
  const user = new User({ name, email, age, workType, password:hashedPassword, confirmpassword });
  const response = await user.save();
  if (response) {
    return res.status(200).json({ message: "Registration is successful"});
  }
  else {
    return res.status(500).json({ message: "Registration Failed" });
  }
})


//Login Router
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the credentials' });
    }
    //Check the email from the database
    const exist = await User.find({ email: email });
    if (exist) {
      return res.status(200).json({ message: 'Successfully Logged IN' });
    }
  }
  catch (err) {
    return res.status(500).send(err);
  }
})

module.exports = router;