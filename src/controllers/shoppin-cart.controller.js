const { default: mongoose } = require('mongoose');
const Cart = require('../models/ordersCart.model')
const Products = require('../models/ordersProducts.model')

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

const updateShoppingCart = async (req, res, next) => {
    if (req.params?.userId) {
        try {
            const { userId } = req.params;

            let cart = await Cart.findOne({ userId });

            if (!cart) {
                // Crear un nuevo carrito si no existe
                cart = new Cart({
                    _id: new mongoose.Types.ObjectId(),
                    userId,
                    ... req.body,
                });
                console.log(cart)

                await cart.save();
                res.status(201).json(cart);
            } else {
                // Lógica para actualizar el carrito existente, si es necesario
                // ...
                res.status(200).json(cart);
            }
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: 'No userId provided' });
    }
};



module.exports = {
    getShoppingCart,
    updateShoppingCart
}