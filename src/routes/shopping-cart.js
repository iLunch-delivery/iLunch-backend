const express = require('express')
const router = express.Router()
const Cart = require('../models/ordersCart.model')
const Products = require('../models/ordersProducts.model')


const {
    getShoppingCart,
    //editShoppingCart,
    //deleteProduct,
    //getShoppingCartDetails
} = require('../controllers/shoppin-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', (req, res) => {
    if (req.params?.userId){
        try {
            const {userId} = req.params
            const cart = await OrderCart.findOne({ userId: Number(restaurantId) });
            const 
        } 
        catch {

        }
    }
})

module.exports = router;