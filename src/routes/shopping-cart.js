const express = require('express')
const router = express.Router()


const {
    getShoppingCart,
    editShoppingCart,
    deleteProduct,
    //getShoppingCartDetails
} = require('../controllers/shoppin-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

//DELETE - delete shopping cart item
router.delete('/:userId/delete_product/:productId', deleteProduct)

//GET - get order details
//router.get('/order/:userId', getShoppingCartDetails)

//PUT - update product units
router.put('/:userId/update_product/:productId', editShoppingCart)

module.exports = router;