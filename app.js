var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config() // .env file

// DB connection
var mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ilunch-db.hrlt9mx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`)
  })

var indexRouter = require('./src/routes/index')
var usersRouter = require('./src/routes/users')
var jobsRouter = require('./src/routes/jobs')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/jobs', jobsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
