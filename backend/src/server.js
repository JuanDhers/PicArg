//Definicion de variables de entorno para que existan antes de ser requeridas
process.env.BASE_URL = 'http://localhost:8888/'; // variable de entorno. configuración a nivel de entorno
                                                //es una variable que se puede setear para ser accible de cualquier parte
                                                //se declara dentro de la configuracion global de node.

process.env.IMAGES_URL = process.env.BASE_URL + "images/";

//Fin definicion de variables de entoro


const express = require('express');
const cors    = require('cors');
const bodyParser = require('body-parser');  //permite leer lo que venga en el body. 
                                            //primero tiene que estar instalado npm i body-paser

const fileUpload = require('express-fileupload'); // permite subir archivos. se tiene que instalar npm i express-fileupload


const sessionRoute = require('./routes/session_routes');// conexion con session_routes  - recibe router
                                            
const fotosRoutes = require('./routes/fotos_routes'); //conexión con fotos_routes. 
                                                      //fotosRouter recibe  el export de router de fotos_routes 

const favoritosRoutes = require('./routes/favoritos_routes');

const alertaRoutes = require('./routes/alertas_routes');

const registroUsuarioRoutes = require('./routes/registroUsuario_routes');

const miCuentaRoutes = require('./routes/miCuenta_routes');

const categoriasRoutes = require('./routes/categorias_routes');


const app = express();

//se declara el uso de body para que se puede usar en cualquier ruta. 
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());

app.use(fileUpload()); // declaro el uso de express-filupload - parsea el formData del envio del archivo

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const auth = require('./auth');


app.use(express.static('../public')) //defino la ruta de los archivos estaticos
                                     //declaro la carpeta como publica

app.use( cors({
                credentials: true,
                origin: 'http://localhost:3000',
                allowedHeaders: ['Content-Type']
})
)
// permite que express-session trabaje con FileStore para almacenar las sesiones.
app.use(session({
    store  : new FileStore,
    secret : '123465',
    resave: false,
    saveUninitialized: true,
    name: 'fotoArg'
}))


app.use('/auth', sessionRoute); // maneja la ruta de sessionRoutes

app.use('/fotos', fotosRoutes); // la ruta /fotos la maneja fotosRoutes

app.use('/favoritos', favoritosRoutes); // la tura de favoritos.

app.use('/alerta', alertaRoutes); // la tura de favoritos.

app.use('/registro',registroUsuarioRoutes);

app.use('/micuenta',miCuentaRoutes);

app.use('/categorias', categoriasRoutes)

app.listen(8888, ()=>{ console.log('Escuchando...')} );