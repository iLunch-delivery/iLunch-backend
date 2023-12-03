const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId},
  userId: { type: Number, required: true },
  deliveryWay: { type: String, default: 'Domicilio' }, // Asumiendo que podría estar vacío y no es requerido.
  paymentMethod: { type: String, default: 'Efectivo' }, // Asumiendo que podría estar vacío y no es requerido.
  restaurantId: { type: Number, default: 0 },
  additionalComments: { type: String, default: '' }, // Asumiendo que podría estar vacío y no es requerido.
  orderSent: { type: Boolean, default: false } // Asumiendo que podría estar vacío y no es requerido.
}, { collection: 'Order_carts', versionKey: false });

const OrderCart = mongoose.model('Order_carts', OrderSchema);

module.exports = OrderCart;
