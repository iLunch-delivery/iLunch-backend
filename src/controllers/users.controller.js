const User = require('../models/users.model')
const Files = require('../models/files.model')

/* GET - get user info */
const getLoginUser = async (req, res, next) => {
  if (req.params.email) {
    const { email } = req.params
    const user = await User.findOne({ email })

    /* Response */
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else if (!req.params.password) {
      res.status(400).json({ message: 'No password provided' })
    } else if (user.password !== req.params.password) {
      res.status(400).json({ message: 'Wrong password' })
    } else {
      res.status(200).send(user)
    }
  } else {
    res.status(400).json({ message: 'No email provided' })
  }
}

/* POST - create new user */
const singUpUser = async (req, res, next) => {
  const requiredFields = {
    address: 'Address is required',
    email: 'Email is required',
    name: 'Name is required',
    password: 'Password is required',
    phone: 'Phone is required'
  }

  for (const field in requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: requiredFields[field] })
    }
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    role: 'Customer',
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
  const { email, ...updates } = req.body

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
  const { userId } = req.params
  const userFile = await Files.find({ userId })

  if (userFile.length === 0) {
    res.status(404).json({ message: 'User has no files' })
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
