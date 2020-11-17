const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

const data = path.join(__dirname, '../database/users.json');

const readJSON = () => {
    return JSON.parse(fs.readFileSync(data), 'utf-8');
} //LEER JSON

const writeJSON = (db, file) => {
    return fs.writeFileSync(db, JSON.stringify(file, null, 2));
} //ESCRIBIR JSON


// REGISTRARSE Y LOGUEAR PARA PODER CREAR UNA PELICULA, EDITAR Y ELIMINAR

module.exports = {
    login: (req, res) => { //RENDER LOGIN
        res.render('users/login') 
    },

    processLogin: (req, res) => { //PROCESS LOGIN

        let errors = validationResult(req);
        let dbUser = readJSON();
        let usuarioEncontrado;

        if (errors.isEmpty()) {

            dbUser.forEach(user => {
                if (req.body.email == user.email && bcrypt.compareSync(req.body.password, user.password)) {
                    usuarioEncontrado = user;
                }
            })

            if (!usuarioEncontrado) {
                res.render('users/login', {errors: [
                    {msg: 'Credenciales Invalidas'}
                ]})
            }

            req.session.usuarioLogueado = usuarioEncontrado;
            
            if (req.body.remember != undefined) {
                res.cookie('remember', usuarioEncontrado, {maxAge: 1000000 * 60 });
            }

            res.redirect('/movies')

            } else {
                res.render('users/login', {errors: errors.errors})
            }


    },

    register: (req, res) => { //SIGN UP
        res.render('users/register')
    },

    processRegister: (req, res) => { //PROCESS SIGN UP
        let errors = validationResult(req)
        
        let dbUser = readJSON();

        
        
        
        if (errors.isEmpty()) {
            
            userRepited = dbUser.filter(user => req.body.email == user.email)
            if (userRepited != '') {
                res.render('users/register', {errors: [
                    {msg: 'Email ya existente'}
                ]}).bail()
            
            }
            let myUser = {
                id: Number(dbUser[dbUser.length - 1].id) + 1,
                ...req.body
            }
            
            myUser.password = bcrypt.hashSync(myUser.password, 10);
            
            let newDbUser = [
                ...dbUser, myUser
            ]

                writeJSON(data, newDbUser)
                res.redirect('login')
                }
        
            else {
                res.render('users/register', {errors: errors.errors})
            }

    },

    logout: (req, res) => { //DESTROY COOKIE

        res.clearCookie('remember')
        req.session.destroy();

        res.redirect('../movies')
    }

}