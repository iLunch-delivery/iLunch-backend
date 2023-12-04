const { default: mongoose } = require('mongoose');
const User = require('../models/users.model')
const Files = require('../models/files.model')

/* GET - get user info */
const getLoginUser = async (req, res, next) => {
  
  if (req.params.email) {
    try {
      const { email } = req.params
      const user = await User.findOne({ email })

      /* Response */
      if (!user) {
        res.status(404).json({ message: 'Usuario no registrado.' })
      } else if (!req.params.password) {
        res.status(400).json({ message: 'No se ha proporcionado la contraseña.' })
      } else if (user.password !== req.params.password) {
        res.status(400).json({ message: 'Contraseña incorrecta.' })
      } else {
        res.status(200).send(user)
      }
    } catch (error) {
      // Manejo de errores con middleware de errores
      next(error); 
    }
  } else {
    res.status(400).json({ message: 'No se ha proporcionado el correo electrónico.' })
  }
}

/* POST - create new user */
const singUpUser = async (req, res, next) => {
  try {
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

    const { email } = req.body
    const existUser = await User.findOne({ email: email })
    if (existUser) {
      return res.status(400).json({ message: 'Ya se encuentra registrado un usuario con el correo electrónico ingresado.' })
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
  } catch (error) {
    // Manejo de errores con middleware de errores
    next(error); 
  }
}

/* PATCH - update user info */
/*Así como está, no va a dejar editar nombre y contraseña (y eso es bueno)*/
/*Tampoco permite cambiar la identificación, porque es la key de los usuarios*/
const updateUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    // Manejo de errores con middleware de errores
    next(error); 
  }
}

/* GET - get user files  */
const getUserFiles = async (req, res, next) => {
  try {
    const { userId } = req.params
    const userFiles = await Files.find({ userId: new mongoose.Types.ObjectId(userId) })

    if (userFiles.length === 0) {
      res.status(404).json({ message: 'User has no files' })
    } else {
      res.status(200).json(userFiles)
    }
  } catch (error) {
    // Manejo de errores con middleware de errores
    next(error); 
  }
}

module.exports = {
  getLoginUser,
  singUpUser,
  updateUser,
  getUserFiles
}
