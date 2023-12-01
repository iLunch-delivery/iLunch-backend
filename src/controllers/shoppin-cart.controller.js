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
            const {userId} = req.params;
            const cart = await Cart.findOne({ userId });
            // Si no existe el carrito, se crea
            if (!cart) {
                const requiredFields = {
                    restaurantId: 'restaurantId is required',
                    deliveryWay: 'deliveryWay is required',
                    paymentMethod: 'name is required',
                    additionalComments: 'password is required',
                    deliveryPrice: 'phone is required'
                }
                
                for (const field in requiredFields) {
                    if (!req.body[field]) {
                        return res.status(400).json({ message: requiredFields[field] })
                    }
                }
                req.body[deliveryWay]
                const newCart = new Cart({
                    ...req.body
                  })
                const savedCart = await newCart.save()
                res.status(201).json(savedCart)
            }
        } catch (error) {
            // Manejo de errores con middleware de errores
            next(error); 
        }
    } else {
        res.status(400).json({ message: 'No userId provided' });
    }
}

module.exports = {
    getShoppingCart,
    updateShoppingCart
}