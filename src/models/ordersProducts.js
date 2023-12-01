const mongoose = require('mongoose');

const OrderProductSchema = new mongoose.Schema({
  _id: {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true }
  },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  units: { type: Number, required: true }
}, { collection: 'Order_products' });

const OrderProduct = mongoose.model('Order_products', OrderProductSchema);

module.exports = OrderProduct;
