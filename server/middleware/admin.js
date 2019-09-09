let admin = (req, res, next)=> {
  if(req.user.role === 0) {
    return res.status(401).send('Invalid permissions');
  }  
  next();
};


module.exports = { admin };