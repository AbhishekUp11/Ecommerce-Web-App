const jwt = require('jsonwebtoken');
const user = require('../models/users');
const User = user.User;

exports.isSignInNeeded = async (req, res, next) => {
     try{
      console.log("re headers",req.headers.authorization)
      // const token = req.headers.authorization.split('Bearer ')[1];
      // console.log("token", token)
      // const result = jwt.verify(token,
      //   sfsdfnsffwecnsdcssdkfjsaklsksdlfk
      //   );
      next();
     }catch(err){
        res.status(303).send("Not a valid User")
     }
}

exports.isAllowed = async (req, res, next) => {
  try{

    const user = await User.findOne({_id: req.body._id});
    const role = user.role;

    if(role == 0){
      res.status(402).send({
        success: false,
        message: "Invalid Access"
      })
    }
    else{
      next();
    }
  }catch(err){

  }
}
