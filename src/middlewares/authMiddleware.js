module.exports = {
    auth: (req, res, next) => {
        if (req.session.usuarioLogueado || req.cookies.remember) {
            next()
        }
        else {
            res.render('users/auth')
        }
    }
}