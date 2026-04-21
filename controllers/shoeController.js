const Shoe = require('../models/Shoe');

exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.render('shoes', { shoes }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getShoeById = async (req, res) => {
  res.json(req.shoe);
};


exports.createShoe = async (req, res) => {
  try {
    if (!req.body.name || !req.body.brand || !req.body.price || !req.body.size) {
      return res.status(400).json({ message: 'חסרים שדות חובה: שם, מותג, מחיר ומידה' });
    }

    const newShoe = new Shoe({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      size: req.body.size,
      color: req.body.color,
      category: req.body.category,
      image: req.body.image,
      inStock: req.body.inStock !== false
    });

    const savedShoe = await newShoe.save();
    res.status(201).json(savedShoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateShoe = async (req, res) => {
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteShoe = async (req, res) => {
  try {
    await Shoe.findByIdAndDelete(req.params.id);
    res.json({ message: 'נעל נמחקה בהצלחה' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
