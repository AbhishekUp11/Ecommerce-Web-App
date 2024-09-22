const user = require('../models/users');
const User = user.User;
const authHelper = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {

  const {firstName, lastName, email, phoneNumber, address, password} = req.body;

  if(!firstName){
    res.status(200).send({message: "first Name is required field"});
  }

  if(!lastName){
    res.status(200).send({message: "last Name is required field"});
  }

  if(!email){
    res.status(200).send({message: "Email is required field"});
  }

  if(!phoneNumber){
    res.status(200).send({message: "Phone Number is required field"});
  }

  if(!address){
    res.status(200).send({message: "Address is required field"});
  }

  if(!password){
    res.status(200).send({message: "Password is required field"});
  }

  // check existing user
  const existingUser = await User.findOne({email});
  if(existingUser){
    res.status(200).send({
      success: false,
      message: "User already Exists, Please login"
    })
  }

  const hashedPassword = await authHelper.hashPassword(password);
  const createdToken = jwt.sign({email:email}, 'sfsdfnsffwecnsdcssdkfjsaklsksdlfk', {
    expiresIn: '7d'}, {algorithm: 'RS256'})
  const user = new User(req.body);
  user.token = createdToken;
  user.password = hashedPassword;

  try{
    user.save()
    res.status(200).send({
      success: true,
      message: "User Registered successfully",
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
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(200).send({
      message: "Either email or Password is not present"
    })
  }
  const user = await User.findOne({email: email});
  if(!user){
    return res.status(200).send({
      success: false,
      message: "User is not Registered"
    })
  }
  const existingPassword = user.password;
  const result = await authHelper.compareDuplicate(password, existingPassword);
  if(!result){
    return res.status(200).send({
             success: false,
             message: "Invalid user"
          })
  }else{
    return res.status(202).send({
      success: true,
      message: "login successfully",
      user
    })
  }
};

exports.forgotPassword = async (req, res) =>{
  try{
    const {email, answer, newPassword} = req.body;
    if(!email){
      res.status(300).send({message: "Email is required"})    
    }
    if(!answer){
      res.status(300).send({message: "answer is required"})
    }
    if(!newPassword){
      res.status(300).send({message: "New Password is required"})
    }

    const user = User.findOne({email: email, answer: answer});
    console.log("user", user)
    if(!user){
      res.status(303).send({message: "Either email or answer is wrong"})
    }
    const hashedPassword = authHelper.hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, {password: hashedPassword});
    res.status(200).send({
      success: TransformStreamDefaultController,
      message: "Password reset Successfully"
    });
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      err
    })
  }
  

}

exports.isTest = (req, res) => {
  res.status(302).send("isTest is verified")
}

exports.updateProfile = async (req, res) => {
  try{
    const { name, email, password, phone, address, id} = req.body;
    const user = await User.findById(id);
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await authHelper.hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: name || user.firstName,
        password: hashedPassword || user.password,
        phoneNumber: phone || user.phoneNumber,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });

  }catch(err){
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      err
    })
  }
};
