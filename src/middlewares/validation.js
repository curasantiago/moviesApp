const { body, validationResult } = require('express-validator');

module.exports = {

    loginValidation: [
        body('email').isEmail().withMessage('Tiene que ser un email').bail(),
        body('password').isLength({min: 5}).withMessage('Mínimo 5 caracteres').bail()
    ],

    registerValidation: [
        body('name').isLength({min: 5}).withMessage('Name: Mínimo 5 caracteres').bail(),
        body('email').isEmail().withMessage('Tiene que ser email').bail(),
        body('password').isLength({min: 5}).withMessage('Password: Mínimo 5 caracteres').bail()
    ],

    createValidation: [
        body('title').notEmpty().withMessage('Title: No puede estar vacio').bail(),
        body('rating').isNumeric().withMessage('Rating: Tiene que ser un número').bail(),
        body('awards').isNumeric().withMessage('Awards: Tiene que ser un número').bail(),
        body('length').isNumeric().withMessage('Length: Tiene que ser un número').bail(),
        body('release_date').notEmpty().withMessage('Fecha: Selecciona una fecha').bail(),
        body('actor_id').notEmpty().withMessage('Actors: Seleccionar al menos un actor').bail()
    ]
}