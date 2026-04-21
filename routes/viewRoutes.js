const express = require('express');
const router = express.Router();
const Shoe = require('../models/Shoe');
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
  try {
    const shoes = await Shoe.find();
    const users = await User.find();
    res.render('index', { shoes, users });
  } catch (err) {
    res.status(500).send('שגיאה בטעינת הנתונים');
  }
});


router.get('/add-shoe', (req, res) => {
  res.render('add-shoe');
});


router.get('/register', (req, res) => {
  res.render('register');
});


router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: role || 'user' });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('שגיאה בהרשמה');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('אימייל או סיסמה שגויים');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('אימייל או סיסמה שגויים');
    res.redirect('/');
  } catch (err) {
    res.status(500).send('שגיאה בהתחברות');
  }
});


router.post('/add-shoe', async (req, res) => {
  try {
    if (!req.body.name || !req.body.brand || !req.body.price || !req.body.size) {
      return res.status(400).send('חסרים שדות חובה');
    }

    const newShoe = new Shoe({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      size: req.body.size,
      color: req.body.color,
      category: req.body.category,
      image: req.body.image,
      inStock: req.body.inStock === 'true'
    });

    await newShoe.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('שגיאה בשמירת הנעל');
  }
});

module.exports = router;
