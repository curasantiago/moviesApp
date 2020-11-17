var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { loginValidation, registerValidation } = require('../middlewares/validation');
const validationMiddleware = require('../middlewares/validation')


/* GET users listing. */
router.get('/login', userController.login); //LOGIN
router.post('/login', loginValidation, userController.processLogin); //PROCESS LOGIN

router.get('/check', (req, res) => {
    if(req.session.usuarioLogueado == undefined) {
        res.send('No estas logueado')
    } else {
        res.send('Logueado!')
    }
})

router.get('/register', userController.register); //REGISTER
router.post('/register', registerValidation, userController.processRegister); // PROCESS REGISTER


router.post('/logout', userController.logout); // LOGOUT SESSION

module.exports = router;
