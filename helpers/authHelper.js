const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  try {
    const salted = 10;
    const hashedPassword = await bcrypt.bcrypt(password, salted);
    return hashedPassword;
  }
  catch(err){
    console.log("Error in encrypting Password", err)
  }
};

exports.compareDuplicate = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
};