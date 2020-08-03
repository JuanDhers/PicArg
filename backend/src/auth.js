//middleware.   next apunta al siguiente middleware
const auth = function(req, res, next){
    //pregunto si user esta en sesion, para saber que se logueo
    if(req.session.user){
        next()
    }
    else{
        //cambio el estado a 401, no autorizado
        res.status(401);

        //envio la respuesta 
        res.send({
            status: 'error',
            message: 'No posse los permisos necesarios para ingresar a esta seccion'
        });
    }
}

module.exports = auth;