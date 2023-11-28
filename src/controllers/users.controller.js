const User = require('../models/users.model')

/* GET - get user info */
const getLoginUser = async (req, res, next) => {
  if (req.body?.email) {
    const { email } = req.body
    const user = await User.findOne({ email })

    /* Response */
    if (!user) {
      res.status(404).json({ message: 'user not found' })
    } else if (!req.body?.password) {
      res.status(400).json({ message: 'no password provided' })
    } else if (user.password !== req.body.password) {
      res.status(400).json({ message: 'wrong password' })
    } else {
      res.status(200).json(user)
    }
  } else {
    res.status(400).json({ message: 'no email provided' })
  }
}

/* POST - create new user */

/* PATCH - update user info */

/* GET - get user files  */

module.exports = {
  getLoginUser
}
