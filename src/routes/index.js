var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nuevo-endpoint', function(req, res, next) {
  res.send('¡Hola soy iLunch!');
});

module.exports = router;
