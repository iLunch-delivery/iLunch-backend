const express = require('express')
const router = express.Router()

const {
  getShoppingCart,
  updateShoppingCart,
  addProduct,
  updateProductUnits,
  deleteProduct,
  getOrderDetails
} = require('../controllers/shopping-cart.controller')

//GET - get shopping cart elements
router.get('/:userId', getShoppingCart)

//PUT - update shopping cart elements or create new one shopping cart
router.put('/:userId/update', updateShoppingCart)

//PUT - add shopping cart product o increment units of the  exist product
router.put('/:userId/add_product/:productId', addProduct)

//DELETE - delete shopping cart product
router.delete('/:userId/delete_product/:productId', deleteProduct)

//PUT - update shopping cart product units
router.put('/:userId/update_product/:productId', updateProductUnits)

//GET - get order details
router.get('/:userId/order', getOrderDetails)

module.exports = router;