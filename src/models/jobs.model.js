const mongoose = require('mongoose')

const JobsSchema = mongoose.Schema(
  {
    _id: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    imageURL: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    offerTime: { type: String, required: true },
    offerSalary: { type: String, required: true }
  },
  { collection: 'Jobs' }
)

const Jobs = mongoose.model('Jobs', JobsSchema)

module.exports = Jobs
