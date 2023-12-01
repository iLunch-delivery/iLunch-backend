const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  categories: [{ type: String, required: true }],
  speciality: { type: String, required: true },
  rating: { type: Number, required: true },
  popularDishes: [{ type: String, required: true }],
  deliveryTime: { type: Number, required: true },
  promotions: [{ type: String }],
  logoURL: { type: String, required: true },
  bannerURL: { type: String, required: true },
  open: { type: Boolean, required: true },
  availability: { type: String, required: true },
  distance: { type: Number, required: true },
  address: { type: String, required: true }
}, { collection: 'Restaurants' });

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
