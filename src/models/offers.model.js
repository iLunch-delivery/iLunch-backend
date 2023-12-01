const mongoose = require('mongoose')

const OffersSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: Number, required: true },
    jobId: { type: Number, required: true }
  },
  { collection: 'Work_offers' }
)

const Offers = mongoose.model('Work_offers', OffersSchema)

module.exports = Offers