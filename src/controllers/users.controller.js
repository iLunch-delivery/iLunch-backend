const User = require('../models/users.model')
const Files = require('../models/files.model')

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
const singUpUser = async (req, res, next) => {
  const requiredFields = {
    address: 'address is required',
    email: 'email is required',
    name: 'name is required',
    password: 'password is required',
    phone: 'phone is required'
  }

  for (const field in requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: requiredFields[field] })
    }
  }

  const user = new User({
    ...req.body,
    role: 'customer',
    _id: {
      idType: 0,
      idNumber: 0
    }
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* PATCH - update user info */
/*Así como está, no va a dejar editar nombre y contraseña (y eso es bueno)*/
/*Tampoco permite cambiar la identificación, porque es la key de los usuarios*/
const updateUser = async (req, res, next) => {
  const { name, password, email, ...updates } = req.body

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updates, {
      new: true
    })
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.status(200).json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* GET - get user files  */
const getUserFiles = async (req, res, next) => {
  const { user_id } = req.body
  const userFile = await Files.find({ user_id })

  if (userFile.length === 0) {
    res.status(404).json({ message: 'user has no files' })
  } else {
    res.status(200).json(userFile)
  }
}

module.exports = {
  getLoginUser,
  singUpUser,
  updateUser,
  getUserFiles
}
