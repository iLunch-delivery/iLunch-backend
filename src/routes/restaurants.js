var express = require('express')
var router = express.Router()
const {
    getRestaurantById,
    searchRestaurants
} = require('../controllers/restaurants.controller')

/* GET - get resturant by Id */
router.get('/:restaurantId', getRestaurantById)

/* GET - search on restaurants*/
router.get('/', searchRestaurants)

module.exports = router