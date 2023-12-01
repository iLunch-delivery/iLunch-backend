const Cart = require('../models/ordersCart.model')
const Products = require('../models/ordersProducts.model')
const User = require('../models/users.model')
const mongoose = require('mongoose');

const getShoppingCart = async (req, res, next) => {
    if (req.params?.userId) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ userId });
            const products = await Products.find({ "_id.userId": userId }); // Cambiado de findOne a find para obtener un array
            if (!cart) {
                return res.status(404).json({ message: 'Shopping cart does not exist' });
            }
            if (!products.length) { // Verificar si el array de productos está vacío
                return res.status(404).json({ message: 'Shopping cart empty' });
            }
            const order = { ...cart.toObject(), productos: products }; // Incluir el array de productos en la respuesta
            res.status(200).json(order);
        } catch (error) {
            // Manejo de errores con middleware de errores
            next(error); 
        }
    } else {
        res.status(400).json({ message: 'No userId provided' });
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const result = await Products.deleteOne({ "_id.productId": productId });
        const products = await Products.find({ "_id.userId": userId }); 
        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'The product does not exists' });
            return;
        }
        res.status(200).send({ message: 'El producto ha sido eliminado', productos: products});
        
        } catch (error) {
            // Manejo de errores con middleware de errores
            next(error); 
        }
}

const getShoppingCartDetails = asyn (req, res) => {
    const {userId, restaurantId, }
    const user = await User.findOne({})
}

module.exports = {
    getShoppingCart,
    deleteProduct,
    getShoppingCartDetails
}