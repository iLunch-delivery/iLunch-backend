const Cart = require('../models/ordersCart.model')
const Products = require('../models/ordersProducts.model')

const getShoppingCart = async (req, res, next) => {
    if (req.params?.userId) {
        try {
            const {userId} = req.params
            const cart = await Cart.findOne({userId});
            const products = await Products.find({userId})
            if (!cart) {
                return res.status(404).json({ message: 'Shopping cart does not exist' });
            }
            if (!products) {
                return res.status(404).json({ message: 'Shopping cart empty' });
            }
            const order = { ...cart.toObject(), productos: products };
            res.status(200).json(order);
            } catch (error) {
                // Manejo de errores con middleware de errores
                next(error); 
            }
        } else {
            res.status(400).json({ message: 'No userId provided' });
        }
    }

module.exports = {
    getShoppingCart
}