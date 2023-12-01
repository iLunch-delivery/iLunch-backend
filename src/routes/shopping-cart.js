const express = require('express')
const router = express.Router()


const {
    getShoppingCart,
    //editShoppingCart,
    deleteProduct,
    //getShoppingCartDetails
} = require('../controllers/shoppin-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

router.delete('/:userId/delete_product/:productId', deleteProduct)


module.exports = router;