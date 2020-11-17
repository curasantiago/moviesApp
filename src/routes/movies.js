var express = require('express');
var router = express.Router();
let db = require('../database/models')
let moviesController = require('../controllers/moviesController')
let middlewares = require('../middlewares/validation');
let authMiddleware = require('../middlewares/authMiddleware')
const { createValidation } = require('../middlewares/validation');



router.get('/', moviesController.list) //listar
router.post('/', moviesController.processSearch) //Process SEARCH

router.get('/new', moviesController.new) //NEW MOVIES
router.get('/recommended', moviesController.recommended) //RATING


router.get('/create', authMiddleware.auth, moviesController.create) //CREATE A MOVIE
router.post('/create', createValidation, moviesController.processCreate); //PROCESS CREATE

router.get('/edit/:id', authMiddleware.auth, moviesController.edit) //EDIT MOVIE
router.put('/edit/:id', createValidation, moviesController.processEdit) //PROCESS EDIT

router.get('/genres', moviesController.genres) //GENRE
router.get('/genres/:id', moviesController.genreDetail) //GENRE DETAIL

router.get('/actors', moviesController.actors) //ACTORS
router.get('/actors/:id', moviesController.actorDetail) //ACTORS DETAIL

router.get('/detail/:id', moviesController.detail) // DETAIL 
router.delete('/delete/:id', authMiddleware.auth, moviesController.destroy) //DESTROY


module.exports = router;
