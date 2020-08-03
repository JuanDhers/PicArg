const express = require('express');
const router = express.Router();
const conexion = require('../connection');


// AGREGAR USUARIO
router.post('/', (req, res)=>{
    let sqlInsert = `INSERT INTO usuarios(usr_mail, usr_nombre, usr_apellido, usr_password)
                       VALUES(?, ?, ?, ?)`;
   
    let values = [req.body.mailUsuario, req.body.nombreUsuario, req.body.apellidoUsuario, req.body.passwordUsuario];
   
    conexion.query(sqlInsert, values, (err, result, fields)=>{
        if(err){
            res.json(
                { 
                    status: 'error',
                    message: 'NO',
                }
            )
        }else{
           res.json(
               {
                   status: 'ok',
                   message: 'Usuario Registrado',
               }
           )
        }
    })
   })

   module.exports = router;