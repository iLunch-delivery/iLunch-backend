var express = require('express')
const {
  getLoginUser,
  singUpUser,
  updateUser,
  getUserFiles
} = require('../controllers/users.controller')
var router = express.Router()

/* GET - get user info */
router.get('/login/:email/:password/', getLoginUser)

/* POST - create new user */
router.post('/signup/', singUpUser)

/* PATCH - update user info */
router.patch('/update/', updateUser)

/* GET - get user files  */
router.get('/files/', getUserFiles)

module.exports = router
