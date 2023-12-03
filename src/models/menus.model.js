const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId},
  imageURL: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

const MenuSchema = new mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  restaurantId: { type: Number, required: true },
  menu: { type: [MenuItemSchema], required: true }
}, { collection: 'Menus' });

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
