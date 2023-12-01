var express = require('express')
var router = express.Router()
const {
    getRestaurantById
} = require('../controllers/restaurants.controller')

/* GET - get resturant by Id */
router.get('/:restaurantId', getRestaurantById)


module.exports = router