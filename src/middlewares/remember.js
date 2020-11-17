module.exports = {

    remember: (req, res, next) => {
        res.locals.usuario = false;

        if (req.session.usuarioLogueado) {
            res.locals.usuarioLogueado = req.session.usuarioLogueado
                } else {
                    res.locals.usuarioLogueado = false
                }

        if (req.session.usuarioEncontrado) {
            res.locals.usuario = req.session.usuarioEncontrado;
        } else if (req.cookies.remember) {
            req.session.usuarioEncontrado = req.cookies.remember;
            res.locals.usuario = req.cookies.remember;
        }

        next();
    }
}