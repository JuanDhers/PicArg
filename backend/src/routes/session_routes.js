const express = require ('express');
const router  = express.Router();

const conexion = require('../connection');


//manejo del inicio de sesión 
router.post('/', (req, res) => {

//Consulta en la base de datos si coinciden el mail con la contraseña registrados.
    let sql =`
                SELECT * 
                FROM usuarios
                WHERE usr_mail = ?
                    AND usr_password = ?`;

    //completa posicionalmente la consulta, y lo utilizo para proteger los datos   
    let values =   [
                    req.body.user,
                    req.body.password
                   ]   
    
//ejecuta la consulta.
conexion.query(sql,  values, (err, result, fields) =>{
//Si hay error devuelve status error y mensaje
    if(err){
        res.json(
                    {
                        status: 'error',
                        message: 'No es posible acceder, intente nuevamente'
                    }
                ) 
    }else{
        //chequeo el resultado, si es 1 es true, es correcto.
        if(result.length == 1){
  //para verificar que el usuario esta logueado
  req.session.user = req.body.user;
  req.session.userId = result[0].usr_id;// deja grabado el id de usuario. 

  //recibo en un json la información
            res.json(
                        {
                            status      : 'ok',
                            message     : 'sesion iniciada',
                            // información del ussuario
                            loggedUser  : {
                                            id: req.session.userId,
                                            nombre: result[0].usr_nonbre

                                            }
                        }
                    )   
                }
                else{
                    res.json({
                                status : 'error',
                                message: 'Usuario y/o contraseña invalidos'
                        }
                    );
                }
            }
        } )
    })


//cerrar sesion
//uso el metodo delete para borrar la session
router.delete('/', (req, res) => {
    req.session.destroy( err => {
        if(err){
            res.json(
                {
                    status: 'error',
                    message: 'Error al cerrar la sesión'
                }

            )}
        else{

            res.clearCookie('fotoArg'); // borra la cookie
            res.json(
                {
                    status: 'ok',
                    message: 'sesión cerrada'
                }
            )
        }
    }
    )
})

module.exports = router;

//express-session para manejar la sesion || npm i express-session
//fileStore para que se puedan guardar permanentemente las sesiones, 
//porque si se baja el servidor se pierde la sesion 