const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');
const { checkShoeExists } = require('../middlewares/checkShoeExists');

router.get('/', shoeController.getAllShoes);
router.get('/:id', checkShoeExists, shoeController.getShoeById);
router.post('/', shoeController.createShoe);
router.put('/:id', checkShoeExists, shoeController.updateShoe);
router.delete('/:id', checkShoeExists, shoeController.deleteShoe);

module.exports = router;
