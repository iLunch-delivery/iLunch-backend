var express = require('express')
const { getLoginUser } = require('../controllers/users.controller')
var router = express.Router()

/* GET - get user info */
router.get('/login/', getLoginUser)

/* POST - create new user */

/* PATCH - update user info */

/* GET - get user files  */

module.exports = router
