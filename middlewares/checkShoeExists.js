const Shoe = require('../models/Shoe');

exports.checkShoeExists = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) {
      return res.status(404).json({ message: 'נעל לא נמצאה' });
    }
    req.shoe = shoe;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
