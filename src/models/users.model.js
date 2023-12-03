const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    idType: { type: String },
    idNumber: { type: Number },
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
