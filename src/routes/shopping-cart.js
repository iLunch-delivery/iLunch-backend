const express = require('express')
const router = express.Router()


const {
    getShoppingCart,
    //editShoppingCart,
    //deleteProduct,
    //getShoppingCartDetails
} = require('../controllers/shopping-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

module.exports = router;