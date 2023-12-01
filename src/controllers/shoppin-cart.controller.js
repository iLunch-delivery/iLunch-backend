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
                    ...req.body
                });

                await cart.save();
                res.status(200).json(cart);
            } else {
                // Actualizar el carrito existente
                Object.assign(cart, req.body);
                const result = await cart.save();
                res.status(200).json({message: 'Success'});
            }
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: 'No userId provided' });
    }
};

const addProduct = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const body = req.body; // O los datos específicos a actualizar

        await Products.updateOne(
            {
                '_id.userId': userId,
                '_id.productId': new mongoose.Types.ObjectId(productId)
            },
            {
                $set: {
                    imageURL: body.imageURL,
                    title: body.title,
                    price: body.price
                },
                $inc: { units: 1 } // Incrementar en 1 las unidades
            },
            { upsert: true } // Crear el documento si no existe
        );

        res.status(200).json({ message: 'Producto actualizado o creado exitosamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getShoppingCart,
    updateShoppingCart,
    addProduct
}