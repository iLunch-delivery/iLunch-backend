var express = require('express')
var router = express.Router()

/* GET - get user info */
router.get('/login/', function (req, res, next) {
  if (req.body?.email) {
    res.status(200).send('email provided')
  } else {
    res.status(400).send('no email provided')
  }
})

/* POST - create new user */

/* PATCH - update user info */

/* GET - get user files  */

module.exports = router
