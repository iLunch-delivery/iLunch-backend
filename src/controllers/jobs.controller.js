const Jobs = require('../models/jobs.model')
const Offers = require('../models/offers.model')

/* GET - get all jobs list */
const getAllJobs = async (req, res, next) => {
  const jobs = await Jobs.find()
  res.status(200).json(jobs)
}

/* GET - get jobs list for an user */
const getJobsByUser = async (req, res, next) => {
  if (req.params?.userId) {
    const { userId } = req.params
    const offers = await Offers.find({ userId })
    const jobs = await Jobs.find({
      _id: { $in: offers.map((offer) => offer.jobId) }
    })
    res.status(200).json(jobs)
  } else {
    res.status(400).json({ message: 'no userId provided' })
  }
}

/* GET - get a job info  */
const getJobInfo = async (req, res, next) => {
  if (req.params?.jobId) {
    const { jobId } = req.params
    const job = await Jobs.findOne({ _id: jobId })
    res.status(200).json(job)
  } else {
    res.status(400).json({ message: 'no jobId provided' })
  }
}

/* PATCH - update jobs list for an user */
const deleteOfferByUser = async (req, res, next) => {
  const { userId, jobId } = req.params
  if (!userId || !jobId) {
    res.status(400).json({ message: 'userId and jobId are required' })
  }
  const deletedOffer = await Offers.findOneAndDelete({ userId, jobId })
  if (deletedOffer) {
    res.status(200).json({ message: 'Offer deleted' })
  } else {
    res.status(404).json({ message: 'Offer not found' })
  }
}

/* POST - create new job */
const createJob = async (req, res, next) => {
  const requiredFields = {
    address: 'address is required',
    description: 'description is required',
    name: 'name is required',
    phone: 'phone is required',
    price: 'price is required',
    userId: 'userId is required'
  }

  for (const field in requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: requiredFields[field] })
    }
  }

  const job = new Jobs({
    ...req.body
  })

  try {
    const savedJob = await job.save()
    res.status(201).json(savedJob)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* PATCH - update job info */
const updateJob = async (req, res, next) => {
  const { jobId, ...updates } = req.body

  try {
    const updatedUser = await Jobs.findOneAndUpdate({ jobId }, updates, {
      new: true
    })
    if (!updatedUser) {
      res.status(404).json({ message: 'Job not found' })
    } else {
      res.status(200).json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllJobs,
  getJobsByUser,
  getJobInfo,
  deleteOfferByUser,
  createJob,
  updateJob
}
