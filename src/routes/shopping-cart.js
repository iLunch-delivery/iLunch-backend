const express = require('express')
const router = express.Router()

const {
  getShoppingCart,
  //editShoppingCart,
  //deleteProduct,
  //getShoppingCartDetails,
  updateShoppingCart,
  addProduct
} = require('../controllers/shopping-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

router.put('/:userId/update', updateShoppingCart)

router.put('/:userId/add_product/:productId', addProduct)

module.exports = router
