const express = require('express');
const router = express.Router();
const conexion = require('../connection');



router.get('/:user', (req, res)=>{
    let sql = `SELECT publicaciones.pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto 
                FROM publicaciones, alerta
                WHERE alerta.usr__id = ?
                    AND publicaciones.pub_id = alerta.pub__id`;

                if(req.query.categoria){
                    sql+= ' AND cat_id = ' + req.query.categoria;
                                    }

                    let values = [ req.params.user];    
    
    


    conexion.query( sql, values, (err, result, fields)=>{
        if(err) throw err;
        res.json(result); // falta agregar si devuelve error.
    })
})



router.post('/', (req, res)=>{
  let sqlInsert = `INSERT INTO alerta
                  VALUES(?, ?)`;

  let values = [1, req.body.pubId];

  conexion.query(sqlInsert, values, (err, result, fields)=>{
      if(err){
          res.json(
              { 
                  status: 'error',
                  message: 'Error al realizar la denuncia',
              }
          )
      }else{
          res.json(
              {
                  status: 'ok',
                  message: 'Gracias por colaborar, nuestro equipo revisará la publicación.',
              }
          )
      }
  })
  })

  router.delete('/', (req, res)=>{
    let sqlDelete = `DELETE FROM alerta
                      WHERE usr__id = ?
                         AND pub__id = ?`;
  
    let values = [req.body.userId, req.body.pubId];
  
    conexion.query(sqlDelete, values, (err, result, fields)=>{
        if(err){
            res.json(
                { 
                    status: 'error',
                    message: 'Error al quitar alerta',
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message: 'La publicación ha sido eliminada.',
                }
            )
        }
    })
    })
                 
                 
module.exports = router;