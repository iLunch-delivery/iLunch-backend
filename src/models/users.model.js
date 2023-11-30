const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    _id: {
      idType: { type: String, required: true },
      idNumber: { type: Number, required: true }
    },
    address: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true },
    speciality: { type: String }
  },
  { collection: 'Users' }
)

const User = mongoose.model('Users', UserSchema)

module.exports = User
