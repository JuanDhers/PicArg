const express = require('express');
const router  = express.Router();
const conexion = require('../connection')
const path = require('path');
const fs = require('fs'); // modulo de node que permite trabajar con archivos. reccorerlos, borrarlos  con basename da el nombre de la ruta


//ROUTES

//Consulta sql
router.get('/', (req, res) => {
    
    let sql = `SELECT pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto, cat_id AS categoria
                FROM publicaciones`;

        let where   = '';

        if(req.query.categoria){
            where = where == '' ? ' WHERE ' : ' AND ';
            where+= 'cat_id = ' + req.query.categoria;
        }


    sql += where;  

    conexion.query(sql,function(err, result, fields){
        if(err) throw err;
        res.json(result);
    })
    
})

//BUSQUEDA
router.get('/search/:terminoBuscado', (req, res) => {
    
    let sqlSearch = `SELECT pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto, cat_id AS categoria
                FROM publicaciones
                WHERE pub_titulo LIKE ?`; //like de sql lo que hace es buscar que palabra empieza 

                if(req.query.categoria){
                    // where = where == '' ? ' WHERE ' : ' AND ';
                    sqlSearch+= ' AND cat_id = ' + req.query.categoria;
                                }
                    

    let values= [`%${req.params.terminoBuscado}%`];




    conexion.query(sqlSearch, values, function(err, result, fields){
        if(err) throw err;
        res.json(result);
    })
    
})



// traer las publicaciones del ususario
router.get('/user/:id', (req, res) => {

    let sql =   `SELECT pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto, cat_id AS categoria
                 FROM publicaciones
                 WHERE usr_id = ${req.params.id}`;
    
                 let where   = '';

                 if(req.query.categoria){
                    //  where = where == '' ? ' WHERE ' : ' AND ';
                     sql+= ' AND cat_id = ' + req.query.categoria;
                                 }

                 conexion.query(sql, function(err, result, fields){
                    if(err)throw err;
                    res.json(result)
                })
 
})


//devuelve el objeto
router.get('/:id',(req, res) => {
    let sql =   `SELECT pub_id AS id, pub_titulo AS titulo, pub_precio AS usuario, pub_imagen AS foto, cat_id AS categoria
                FROM publicaciones 
                WHERE pub_id = ${req.params.id}`;

                conexion.query(sql, function(err, result, fields){
                    if(err)throw err;
                    res.json(result[0])
                })
})


//recibe las fotos cargadas en mispublicaciones

router.post('/', (req, res) =>{
    //req.body recibe el cuerpo de lo que se evio desde el front en FotosEditorModals.js. se uso el bodyparser.

    let imageFileName = '';

    if(req.files){
        let fotoImage = req.files.fotoImage;

        
        // con el día y hora le doy un nombre unico.
        // path.extname la extensión del archivo del que se le paso por parametro
        imageFileName = Date.now() + path.extname(fotoImage.name);

        fotoImage.mv ('../public/images/' + imageFileName, function(err){
            if(err){
                console.log(err);
                
            }
        }) //lo que hace es mover el archivo desde el temporal hasta la caprta asignada,  
        console.log(imageFileName);
    }
    else{
        console.log("No hay archivo");
        
    }
    //carga la imagen
    let sqlInsert = `INSERT INTO publicaciones(pub_titulo, pub_precio, pub_imagen, usr_id, cat_id)
                     VALUES(
                         '${req.body.fotoTitulo}',
                         '${req.body.fotoPrecio}',
                         '${process.env.IMAGES_URL + imageFileName}',
                          ${req.session.userId},
                          ${req.body.fotoCategory}
                     )`;

        conexion.query(sqlInsert, function(err, result, fields){
            if(err) {
                res.json(
                    {
                        status: 'error',
                        message: 'error al realizar la publicación'
                    }
                )
            }
            else{
            
            res.send(
                    {
                    status: 'ok',
                    message: 'Publicacion realizada correctamente'
                    }
                )
            }

        } )

})



//MODIFICACION DE PUBLICACION


router.put('/:id', (req, res) =>{
    //req.body recibe el cuerpo de lo que se evio desde el front en FotosEditorModals.js. se uso el bodyparser.

    let imageFileName = '';

    //consulta

    let sqlUpdate = `UPDATE publicaciones
                    SET pub_titulo = ?, 
                    pub_precio = ?,
                    cat_id = ?`;
  
    let values = [
                    req.body.fotoTitulo,
                    req.body.fotoPrecio,
                    req.body.fotoCategory
                ];

    if(req.files){

        //Borro la imagen anterior.

        conexion.query('SELECT pub_imagen FROM publicaciones WHERE pub_id =' +req.params.id, function(err, result, fields){
            if(err){
                console.log('Error')
            }else{
                // obtengo el nombre de toda la dirección
                //fs.unlink borra el nombre del archivo que le pase por path.basename
               fs.unlink( '../public/images/' + path.basename( result[0].pub_imagen), err => {
                   if(err) throw err;
                       console.log('archivo borrado');
                   });
            }
        }) //fin de función que borra la imagen que se quería cambiar 


        //subida de la imagen
        let fotoImage = req.files.fotoImage;
        
        // con el día y hora le doy un nombre unico.
        // path.extname la extensión del archivo del que se le paso por parametro
        imageFileName = Date.now() + path.extname(fotoImage.name);

        fotoImage.mv ('../public/images/' + imageFileName, function(err){
            if(err){
                console.log(err);
                
            }
        }) //lo que hace es mover el archivo desde el temporal hasta la caprta asignada,  

        //lo que va a hacer es que si cambio el archivo y subio una imagen nueva se le agrega la imagen.
        sqlUpdate += ', pub_imagen = ?';
        values.push(process.env.IMAGES_URL + imageFileName); 
    }
    else{
        console.log("No hay archivo");
        
    }

    // aca se agrega

    sqlUpdate += ' WHERE pub_id = ?';
    values.push(req.params.id);//id de la publicacion 


        conexion.query(sqlUpdate, values, function(err, result, fields){
            if(err) {
                res.json(
                    {
                        status: 'error',
                        message: 'error al realizar la modificación de la publicación'
                    }
                )
            }else{
            
            res.send(
                    {
                    status: 'ok',
                    message: 'Publicacion modificada correctamente'
                    }
                )
            }

        } )

})

//DELETE PUB

router.delete('/:id', (req, res)=>{

    let sqlDelete = `DELETE FROM publicaciones
                      WHERE pub_id = ?`;

    values = [req.params.id];

    conexion.query(sqlDelete, values, (err, result, fields)=>{

        if( err ){
            res.json(
                {
                    status: 'error',
                    message : 'Error al eliminar la publicación'
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message : 'La publicación ha sido eliminada correctamente'
                }
            )           
        }

    })

})



//FIN MODIFICACION DE PUBLICACION

module.exports = router;