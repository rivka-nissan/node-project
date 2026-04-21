const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  color: String,
  inStock: { type: Boolean, default: true },
  category: String,
  image: String
});

module.exports = mongoose.model('Shoe', shoeSchema);

