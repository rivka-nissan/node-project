require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000
const shoeRouter = require('./routes/shoeRoutes');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const User = require('./models/user');
const config = require('./DB/config')
const Shoe = require('./models/Shoe');

app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', async (req, res) => {
  try {
    const shoes = await Shoe.find();
    const users = await User.find();
    res.render('index', { shoes, users });
  } catch (err) {
    res.status(500).send('שגיאה בטעינת הנתונים');
  }
});

app.get('/add-shoe', (req, res) => {
  res.render('add-shoe');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await require('bcrypt').hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: role || 'user' });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('שגיאה בהרשמה');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('אימייל או סיסמה שגויים');
    const isMatch = await require('bcrypt').compare(password, user.password);
    if (!isMatch) return res.status(401).send('אימייל או סיסמה שגויים');
    res.redirect('/');
  } catch (err) {
    res.status(500).send('שגיאה בהתחברות');
  }
});

app.post('/add-shoe', async (req, res) => {
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

app.use('/shoes', shoeRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
