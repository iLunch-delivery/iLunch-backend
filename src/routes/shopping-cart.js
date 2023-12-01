const express = require('express')
const router = express.Router()


const {
    getShoppingCart,
    //editShoppingCart,
    //deleteProduct,
    //getShoppingCartDetails,
    updateShoppingCart
} = require('../controllers/shoppin-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

route.put('/:userId/update', updateShoppingCart)

module.exports = router;