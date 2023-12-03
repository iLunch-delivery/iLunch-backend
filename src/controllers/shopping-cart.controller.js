const { default: mongoose } = require('mongoose');
const Cart = require('../models/ordersCart.model')
const Product = require('../models/ordersProducts.model')
const User = require('../models/users.model')
const Restaurant = require('../models/restaurants.model')

const getShoppingCart = async (req, res, next) => {
    if (req.params?.userId) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'El carrito de compra aún no existe. Primero añade productos de un restaurante.' });
            }
			const products = await Product.find({ "_id.userId": userId });
            if (!products.length) { // Verificar si el array de productos está vacío
                return res.status(404).json({ message: 'El carrito de compra está vacío' });
            }
            let totalProductsPrice = 0;
            for (const product of products) {
                totalProductsPrice += product.price * product.units;
            }
            const platformFee = totalProductsPrice * Number(process.env.PLATFORM_FEE);
			const restaurant = await Restaurant.findOne({_id: cart.restaurantId})
            const order = { 
				...cart.toObject(), 
				products: products, 
				homeDeliveryPrice: restaurant.homeDeliveryPrice, 
				totalProductsPrice: totalProductsPrice, 
				platformFee: platformFee
			}; // Incluir el array de productos en la respuesta, junto con el precio de domicilio, precio total de los productos y la comisión de la plataforma
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
			// Actualizar el carrito existente
			Object.assign(cart, req.body);
			await cart.save();
			res.status(200).json({message: 'Carrito de compra actualizado exitosamente'});
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

        let cart = await Cart.findOne({ userId });
        if (!cart) {
			// Crear un nuevo carrito si no existe
			cart = new Cart({
				_id: new mongoose.Types.ObjectId(),
				userId: userId,
				restaurantId: body.restaurantId,
			});

			await cart.save();
        }

        await Product.updateOne(
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

const updateProductUnits = async (req, res) => {
  const {productId, userId} = req.params
  const newUnits = req.body.units
  const update = { units: newUnits };
  
  const result = await Product.updateOne({ "_id.productId": new mongoose.Types.ObjectId(productId), "_id.userId": userId }, update);
  
  if (result.nModified === 0) {
      res.status(404).send({ message: 'Error: La actualización no ha podido ser realizada' });
      return;
  }
  
  res.status(200).send({ message: 'Las unidades del producto en el carrito se han actualizado exitosamente' });
};

const deleteProduct = async (req, res, next) => {
  try {
      const { userId, productId } = req.params;
      const result = await Product.deleteOne({ "_id.productId": productId, "_id.userId": userId });
      const products = await Product.find({ "_id.userId": userId }); 
      if (result.deletedCount === 0) {
          res.status(404).send({ message: 'The product does not exists' });
          return;
      }
      res.status(200).send({ message: 'El producto ha sido eliminado', productos: products});
      
      } catch (error) {
          // Manejo de errores con middleware de errores
          next(error); 
      }
};

const getOrderDetails = async (req, res) => {
  const {userId} = req.params
  //const {userId, restaurantId, email } = req.body
  const user = await User.findOne({email})
  const cart = await Cart.findOne({ userId });
  const products = await Product.find({ "_id.userId": userId }); 
  if (!cart) {
      return res.status(404).json({ message: 'No tiene un pedido activo' });
  }
  if (!products.length) { // Verificar si el array de productos está vacío
      return res.status(404).json({ message: 'No tiene productos para comprar' });
  }
  let totalPrice = 0
  for (const product of products) {
      totalPrice+=product.units*product.price
  }

  if (!user) { 
      return res.status(404).json({ message: 'No se encontró el usuario' });
  }
  
  const restaurantId = cart.restaurantId
  const restaurant = await Restaurant.findOne({restaurantId})
  if (!restaurant) {
      return res.status(404).json({ message: 'No se encontró el restaurante' });
  }    
  const details={
      userInfo: user,
      restaurantDetails: restaurant,
      deliveryDetails:cart,
      productos: products,
      total: totalPrice
      }
  res.status(200).send(details)
};

module.exports = {
    getShoppingCart,
    updateShoppingCart,
    addProduct,
    updateProductUnits,
    deleteProduct,
    getOrderDetails
}