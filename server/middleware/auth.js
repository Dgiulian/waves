const { User } = require('../models/user');
let auth = async (req,res, next) =>{
  let token = req.cookies.w_auth;
  if(!token) {
    return res.status(401);
  }
  try {
    const user = await User.findByToken(token);
    if(!user) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401);
  
  }
  
};

module.exports = {auth};