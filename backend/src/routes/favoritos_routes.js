const express = require('express');
const router = express.Router();
const conexion = require('../connection');


//RUTA QUE TRAE LOS FAVORITOS   
router.get('/:user', (req, res)=>{
    let sql = `SELECT publicaciones.pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto 
                FROM publicaciones, favoritos
                WHERE favoritos.usr_id = ?
                    AND publicaciones.pub_id = favoritos.pub_id`;

                if(req.query.categoria){
                    sql+= ' AND cat_id = ' + req.query.categoria;
                                    }

                    let values = [ req.params.user];    
    
    


    conexion.query( sql, values, (err, result, fields)=>{
        if(err) throw err;
        res.json(result); // falta agregar si devuelve error.
    })
})


// AGREGAR A FAVORITOS
router.post('/', (req, res)=>{
 let sqlInsert = `INSERT INTO favoritos
                    VALUES(?, ?)`;

 let values = [req.body.userId, req.body.pubId];

 conexion.query(sqlInsert, values, (err, result, fields)=>{
     if(err){
         res.json(
             { 
                 status: 'error',
                 message: 'Error al agregar el favorito',
             }
         )
     }else{
        res.json(
            {
                status: 'ok',
                message: 'Agregado a favoritos',
            }
        )
     }
 })
})


//ELIMINAR DE FAVORITOS

router.delete('/', (req, res)=>{
    let sqlDelete = `DELETE FROM favoritos
                       WHERE usr_id = ? 
                            AND pub_id = ?`;
   
    let values = [req.body.userId, req.body.pubId];
   
    conexion.query(sqlDelete, values, (err, result, fields)=>{
        if(err){
            res.json(
                { 
                    status: 'error',
                    message: 'Error al quitar el favorito',
                    
                }
            )
        }else{
           res.json(
               {
                   status: 'ok',
                   message: 'Eliminado de favoritos',
                   
               }
           )
        }
    })
   })


module.exports = router;