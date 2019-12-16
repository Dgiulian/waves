require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Database connected'))
  .catch(console.error);

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');
// USERS
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(doc => res.json({ success: true, userdata: doc }))
    .catch(err => res.json({ success: false, err }));
});

app.get('/api/users/auth', auth, (req, res) => {
  const { email, name, lastname, role, cart, history } = req.user;
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    cart,
    history
  });
});

app.post('/api/users/login', async (req, res) => {
  // Get the email
  const { email, password } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: '"Auth failed: email not found'
      });
    }

    // Compare the password
    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.json({
        success: false,
        message: '"Auth failed: Password did not match'
      });
    }
    const token = await user.generateToken();
    if (!token) {
      return res.json({
        success: false,
        message: '"Auth failed: Password did not match'
      });
    }
    user.token = token;
    await user.save();
    res
      .cookie('w_auth', token)
      .status(200)
      .json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: '"Auth failed: Password did not match'
    });
  }
});

app.get('/api/users/logout', auth, async (req, res) => {
  if (!req.user) {
    return res.json({
      success: true
    });
  }
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: '' });
    return res.json({
      success: true
    });
  } catch (error) {
    return res.json({
      success: false
    });
  }
});
/************************************ */
/************** BRANDS ************** */
/************************************ */

app.post('/api/product/brand', auth, admin, async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.json({ success: true, brand: doc });
  } catch (e) {
    res.json({ success: false, error: e });
  }
});

app.get('/api/product/brands', async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.json({ success: true, brands });
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
});

/************************************ */
/************** WOODS *************** */
/************************************ */
app.post('/api/product/wood', auth, admin, async (req, res) => {
  try {
    const wood = new Wood(req.body);
    const doc = await wood.save();
    res.status(200).json({ success: true, wood: doc });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

app.get('/api/product/woods', async (req, res) => {
  try {
    const woods = await Wood.find({});
    res.json({ success: true, woods });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

/************************************ */
/************** PRODUCTS ************* */
/************************************ */
app.post('/api/product/shop', async (req, res) => {
  let {
    order = 'desc',
    sortBy = '_id',
    limit = 100,
    skip = 0,
    filters = {}
  } = req.body;
  let findArgs = { publish: true };
  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: filters[key][0],
          $lte: filters[key][1]
        };
      } else {
        findArgs[key] = filters[key];
      }
    }
  }
  const articles = await Product.find(findArgs)
    .populate('brands')
    .populate('woods')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit);
  res.status(200).json({ size: articles.length, articles });
});
app.post('/api/product/article', auth, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    res.status(200).json({ success: true, product: doc });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

app.get('/api/product/articles_by_id', async (req, res) => {
  let { items } = req.query;

  let ids = items.split(',');

  items = ids.map(item => mongoose.Types.ObjectId(item));

  try {
    const products = await Product.find({ _id: { $in: items } })
      .populate('brand')
      .populate('wood');
    res.json({ products });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

app.get('/api/product/articles', async (req, res) => {
  const { sortBy = '_id', order = 'asc', limit = 100000 } = req.query;
  try {
    const products = await Product.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(Number(limit));
    res.json({ success: true, products });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).json({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    }
  );
});

app.get('/', (req, res) => {
  res.send('Hey');
});

app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
