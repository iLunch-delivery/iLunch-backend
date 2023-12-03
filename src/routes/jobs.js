var express = require('express')
var router = express.Router()
const {
  getAllJobs,
  createJob,
  getJobInfo,
  getJobsByUser,
  updateJob,
  deleteOfferByUser
} = require('../controllers/jobs.controller')

/* GET - get jobs list */
router.get('/list/all/', getAllJobs)

/* GET - get jobs list for an user */
router.get('/list/user/:userId/', getJobsByUser)

/* PATCH - update jobs list for an user */
router.post('/list/user/:userId/job/:jobId', deleteOfferByUser)

/* GET - get a job info  */
router.get('/info/:jobId', getJobInfo)

/* POST - create new job */
router.post('/new/', createJob)

module.exports = router
