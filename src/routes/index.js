var express = require('express');
var router = express.Router();
let db = require('../database/models')
let moviesController = require('../controllers/moviesController')

//listar

router.get('/', (req, res) => {
  res.redirect('/movies')
})


module.exports = router;
