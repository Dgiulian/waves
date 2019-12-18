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
const { Payment } = require('./models/payment');
const { Site } = require('./models/site');
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// UTILS
const { sendEmail } = require('./utils/mail');

// USERS
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(doc => {
      console.log(doc);
      sendEmail(doc.email, doc.name, null, 'welcome');
      return Promise.resolve(doc);
    })
    .then((doc) => res.json({ success: true, userdata: doc }))
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

app.post('/api/users/update_profile', auth, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!updatedUser) {
    return res.json({ success: false });
  } else {
    res.json({ success: true });
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
  let { id: items } = req.query;

  let ids = items.split(',');

  try {
    items = ids.map(item => mongoose.Types.ObjectId(item));

    const products = await Product.find({ _id: { $in: items } })
      .populate('brand')
      .populate('wood');
    res.json({ products });
  } catch (error) {
    res.status(200).send({ success: false, products: [] });
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

app.post('/api/users/removeImage', auth, admin, (req, res) => {
  const { id } = req.body;
  cloudinary.uploader.destroy(id, result => {
    console.log(result);
    return res.json({ success: true });
  });
});

app.post('/api/users/addtocart', auth, async (req, res) => {
  let duplicate = false;
  const { productId } = req.query;
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
    user.cart.forEach(item => {
      if (item.id == productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.user._id,
          'cart.id': mongoose.Types.ObjectId(productId)
        },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true }
      );
      if (updatedUser) {
        return res.status(200).json({ success: true, cart: updatedUser.cart });
      } else {
        return res.json({ success: false, error: 'User not found' });
      }
      //
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true }
      );
      if (updatedUser) {
        return res.status(200).json({ success: true, cart: updatedUser.cart });
      } else {
        return res.json({ success: false, error: 'User not found' });
      }
    }
  } else {
    return res.json({ success: false, error: 'User not found' });
  }
});
app.post('/api/users/removeFromCart', auth, async (req, res) => {
  const { id } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { cart: { id: mongoose.Types.ObjectId(id) } }
      },
      {
        new: true
      }
    ).exec();

    if (updatedUser) {
      let cart = updatedUser.cart;
      let array = cart.map(item => mongoose.Types.ObjectId(item.id));
      const cartDetail = await Product.find({ _id: { $in: array } })
        .populate('wood')
        .populate('brand');
      return res.status(200).json({ success: true, cartDetail, cart });
    } else {
      return res.json({ success: false, error: 'Could not update the cart ' });
    }
  } catch (e) {
    return res.json({ success: false, error: 'Could not update the cart ' });
  }
});

app.post('/api/users/succsssBuy', auth, async (req, res) => {
  let history = [];
  let transactionData = {};

  // User History
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    });
  });
  // Payment information
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { history }, $set: { cart: [] } },
    { new: true }
  );
  if (!user) {
    return res.json({ success: false });
  }
  const payment = new Payment(transactionData);
  const savedPayment = await payment.save();
  if (!savedPayment) {
    let products = [];
    savedPayment.products.forEach(item =>
      products.push({ id: item.id, quantity: item.quantity })
    );
    await Promise.all(
      products.map(item =>
        Product.update({ _id: item.id }, { $inc: { sold: 1 } })
      ),
      { new: false }
    );
  }
  res.json({ success: true, cart: user.cart, cartDetail: [] });
});
// ================================================================
//                            SITE
// ================================================================
app.get('/api/site', async (req, res) => {
  const site = await Site.find({});
  if (!site || site.length <= 0) {
    return res.json({ success: false });
  }
  return res.json({ success: true, site: site[0].siteInfo });
});

app.post('/api/site', auth, admin, async (req, res) => {
  const updatedSite = await Site.findOneAndUpdate(
    { name: 'site' },
    { $set: { siteInfo: req.body } },
    { new: true }
  );
  res.json({ success: true, site: updatedSite });
});

app.get('/', (req, res) => {
  res.send('Hey');
});

app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
