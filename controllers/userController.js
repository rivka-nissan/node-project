const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'חסרים שדות חובה' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'משתמש נוצר בהצלחה', user: { username, email, role: newUser.role } });
  } catch (err) {
    next(err);
  }
};
exports.getLoginPage = (req, res) => {
  res.send("login page")
}

exports.login = (req, res) => {
  res.send("login works")
}


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'חסרים אימייל או סיסמה' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'התחברות הצליחה', 
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};
