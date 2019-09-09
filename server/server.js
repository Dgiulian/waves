require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Database connected'))
  .catch(console.error);

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models 
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { auth } = require('./middleware/auth');
// USERS
app.post('/api/users/register', (req, res) => {
  
  const user = new User(req.body);
  user.save()
    .then(doc => res.json({ success: true, userdata: doc }))
    .catch(err => res.json({ success: false, err }));
});

app.get('/api/users/auth', auth, (req, res)=>{
  const { email, name, lastname, role,cart, history } = req.user;
  res.status(200).json({
    isAdmin: req.user.role === 0? false: true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    cart,
    history

  });
});


app.get('/api/users/logout', async (req, res)=>{
  try {
    await User.findOneAndUpdate({_id: req.user._id}, { token: ''});
    return res.json({
      success: true,
    });    
  } catch (error) {
    return res.json({
      success: false,
    });
  }
});

app.post('/api/users/login', async (req, res) => {
  // Get the email
  const { email, password } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: '"Auth failed: email not found' });
    }

    // Compare the password
    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.json({ success: false, message: '"Auth failed: Password did not match' });
    }
    const token = await user.generateToken();
    if (!token) {
      return res.json({ success: false, message: '"Auth failed: Password did not match' });
    }
    user.token = token;
    await user.save();
    res.cookie('w_auth', token)
      .status(200)
      .json({ success: true });
  } catch (error) {    
    return res.json({ success: false, message: '"Auth failed: Password did not match' });
  }
});
app.get('/', (req, res) => {
  res.send('Hey');
});


app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});