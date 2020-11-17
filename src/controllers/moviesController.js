let { Movies, Genre, Actors } = require('../database/models');
let { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const moment = require('moment')

// REGISTRARSE Y LOGUEAR PARA PODER CREAR UNA PELICULA, EDITAR Y ELIMINAR


module.exports = {
    list: async (req, res) => { //LISTADO DE PELICULAS

        try {
            let movies = await Movies.findAll({
                order: [
                    ['title', 'ASC']
                ]
            });
            
            res.render('movies/listMovies', {movies})
        }

        catch(err) {
            res.send(err)
        }
    },

    detail: async (req, res) => { //DETALLE DE PELICULA

        try {
            let movie = await Movies.findByPk(req.params.id, {
                include: ['actors', 'genre']
            });

            res.render('movies/detailMovie', {movie, moment})
        }
        catch(err) {
            res.send(err)
        }
    },

    new: async (req, res) => { //ÚLTIMAS 5 PELICULAS - ESTRENOS

        try {
            let movies = await Movies.findAll({

                order: [
                    ['release_date', 'DESC']
                ],

                limit: 5
            })

           res.render('movies/newMovies', {movies, moment})
        }
        catch(err) {
            res.send(err)
        }    
        
    },

    recommended: async (req, res) => { //MEJORES PELICULAS POR RATING
        try {
            let movies = await Movies.findAll({
                where: {
                    rating: { [Op.gt]: 8 }
                },

                order: [
                    ['rating', 'DESC']
                ]
            })
            
            res.render('movies/recommended', {movies})
        }
        catch(err) {
            res.send(err)
        }
    },

    processSearch: async (req, res) => { //BUSCADOR
        try {
            let findMovies = await Movies.findAll({
                where: {
                    title: { [Op.like]: '%' + req.body.search + '%' }
                },
                order: [['' + req.body.order + '', '' + req.body.direction + '']]

            })
            
            res.render('movies/listMovies', {findMovies});
        }
        catch(err) {
            res.send(err)
        }
    },

    create: async (req, res) => { //CREAR UNA PELICULA
        try {
            const genres = await Genre.findAll();
            const actors = await Actors.findAll();
            
            res.render('movies/create', {genres, actors})
        }

        catch(err) {
            res.send(err)
        }
    },

    processCreate: async (req, res) => { //PROCESS CREATE

        try {
            const genres = await Genre.findAll();
            const actors = await Actors.findAll();
            let errors = validationResult(req);

            if (errors.isEmpty()) {
                
                let newMovie = await Movies.create(req.body);
                await newMovie.addActors(req.body.actor_id);
                
                res.redirect('/')

            } else {
                res.render('movies/create', {errors: errors.errors, genres, actors})
            }
        }

        catch(err) {
            res.send(err)
        }

    },

    edit: async (req, res) => { //EDITAR UNA PELICULA

        try {

            const editMovie = await Movies.findByPk(req.params.id, {
                include: ['genre', 'actors']
            });
            const genres = await Genre.findAll();
            const actors = await Actors.findAll();
            res.render('movies/edit', {editMovie, genres, actors, moment})

        }

        catch(err) {
            res.send(err)
        }
       
        
    },

    processEdit: async (req, res) => { //PROCESS EDIT

        try {
            let errors = validationResult(req);
            const genres = await Genre.findAll();
            const actors = await Actors.findAll();
            const editMovie = await Movies.findByPk(req.params.id,
                {
                    include: ['genre', 'actors']
                });

            if (errors.isEmpty()) {

                await editMovie.removeActors(editMovie.actors);
                await editMovie.addActors(req.body.actor_id);
                await editMovie.update(req.body)
                
            }

            else {
                res.render('movies/edit', {editMovie, genres, actors, errors: errors.errors, moment})
            }
            
            res.redirect('/movies/detail/' + req.params.id)
        }

        catch(err) {

        }
    },

    genres: async (req, res) => { //GENEROS

        try {
            const genres = await Genre.findAll();

            res.render('movies/genres', {genres})
        }
        catch(err) {
            res.send(err)
        }
    },

    genreDetail: async (req, res) => { //DETALLE DE CADA GENERO

        try {
            const genre = await Genre.findByPk(req.params.id, {
                include: ['movies']
            })

            res.render('movies/genreDetail', {genre})
        }

        catch(err) {
            res.send(err)
        }
    },

    actors: async (req, res) => { //ACTORES

        try {
            const actors = await Actors.findAll();
            res.render('movies/actors', {actors})   
        }

        catch(err) {
            res.send(err)
        }
    },

    actorDetail: async (req, res) => { //DETALLE DE ACTORES

        try {
            const actor = await Actors.findByPk(req.params.id, {
                include: ['movies']
            })
            res.render('movies/actorDetail', {actor})
        }

        catch(err) {
            res.send(err)
        }

    },

    destroy: async (req, res) => { // ELIMINAR UNA PELICULA

        let deletedMovie = await Movies.findByPk(req.params.id, {
            include: ['actors', 'genre']
        })

        await deletedMovie.removeActors(deletedMovie.actors);
        await deletedMovie.destroy()

        res.redirect('/')
    }

}