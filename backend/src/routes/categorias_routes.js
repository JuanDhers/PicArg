const express = require('express');
const router = express.Router();
const conexion = require('../connection');

router.get('/', (req, res)=>{
    let sql = `SELECT cat_id AS id, cat_nombre AS nombre
                FROM categorias
                ORDER BY cat_nombre`;

conexion.query(sql, function(err, result, fields){
                    if(err) throw err;

                    res.json(result);
                })
})

module.exports = router;