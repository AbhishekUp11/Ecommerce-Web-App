const user = require('../models/users');
const User = user.User;
const authHelper = require('../helpers/authHelper');

exports.signUp = async (req, res) => {
  console.log("error aa rha hai",req.body)
  const {firstName, lastName, email, phoneNumber, address, password} = req.body;
  if(!firstName){
    res.status(200).send("first Name is required field");
  }
  if(!lastName){
    res.status(200).send("last Name is required field");
  }
  if(!email){
    res.status(200).send("Email is required field");
  }
  if(!phoneNumber){
    res.status(200).send("Phone Number is required field");
  }
  if(!address){
    res.status(200).send("Address is required field");
  }
  if(!password){
    res.status(200).send("Password is required field");
  }

  // check existing user
  const existingUser = await User.findOne({email});
  if(existingUser){
    res.status(200).send("User already Exists, Please login")
  }

  const hashedPassword = await authHelper.hashPassword(password);
  
  const user = new User(req.body);
  user.password = hashedPassword
  try{
    user.save()
    res.status(202).send({
      success: true,
      message: " user created successfully",
      user: user
    })
  }catch(err){
    res.status(402).send({
      success: false,
      message: "Error in saving User",
      error: err
    })
  }
};

exports.login = async (req, res) => {
   
};