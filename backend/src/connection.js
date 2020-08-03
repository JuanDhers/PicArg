//CONEXION A LA BASE DE DATOS!

const mysql = require('mysql');

let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fotoarg'
    }
) 

conexion.connect(
    err=>{
        if (err) throw err;

        console.log('conectado!!!')
    }
)

module.exports = conexion;