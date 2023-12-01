const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  userId: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  deliveryWay: { type: String, default: '' }, // Asumiendo que podría estar vacío y no es requerido.
  paymentMethod: { type: String, default: '' }, // Asumiendo que podría estar vacío y no es requerido.
  restaurantId: { type: Number, required: true },
  additionalComments: { type: String, default: '' } // Asumiendo que podría estar vacío y no es requerido.
}, { collection: 'Order_carts' });

const OrderCart = mongoose.model('Order_carts', OrderSchema);

module.exports = OrderCart;
