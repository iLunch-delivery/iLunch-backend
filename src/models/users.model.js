const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true },
    idNumber: { type: Number },
    idType: { type: String },
    speciality: { type: String }
  },
  { collection: 'Users', versionKey: false }
)

const User = mongoose.model('Users', UserSchema)

module.exports = User
