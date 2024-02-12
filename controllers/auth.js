const user = require('../models/users');
const User = user.User;
const authHelper = require('../helpers/authHelper');

exports.signUp = (req, res) =>{
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

  const hashedPassword = authHelper.hashPassword(password);
  password = hashedPassword;
  const user = new User(req.body);
  user.save( (err, doc) => {
    if(err){
      res.json(err)
    }else{
      res.json(doc)
    }
 })  
};

exports.login = (err, res) => {
   
};