import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import TarjetaImagen from './TarjetaImagen';
import NavBarMispublicaciones from './NavBarMispublicaciones'
import FotosEditorModals from './FotosEditorModals';
import SweetAlert from 'sweetalert2';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PubFilter from './PubFilter';



function ListadoFotos(props){

//tiene una variable de estado y una funcion
// recibe un valor inicial un array vacio
const [fotos, setFotos] = useState([])  


//Funcion que va a mostrar o ocultar el modal de FotosEditor Modal
const [ShowFotosEditorModal, setShowFotosEditorModals]  = useState(false);

//función que diferencia de donde viene el llamado al modal, si editar o nueva publicacion.
const [selectedFoto, setSelectedFoto]= useState(null);

//Variable de estado para almacenar los favoritos
const [favoritos, setFavoritos] = useState([]);

//Variable de estado para almacenar las alertas
const [alerta, setAlerta] =useState([]);

//Funcion que recibe el cambio de filtros. 
const handleFilterChange = filtros =>{
    props.onFilterChange(filtros)}

    const handleHideFotosEditorModal = ()=>{
        setSelectedFoto(null);//limpia los campos del modal
        setShowFotosEditorModals(false);
    }

    const onShowFotosEditorModals = ()=>{
        setSelectedFoto(null);//limpia los campos cuando del modal
        setShowFotosEditorModals(true);
    }

//Llama a la función que cierra el modal y recarga el listado de mis publicaciones
//recibe como parametro message que lo muestra despues en el alert
    const handleFotoSaved = (message)=>{
        //cierra el modal
        setShowFotosEditorModals(false);
        //recarga el listado
        cargarListadoFotos();
        //mensaje de carga ok.
        SweetAlert.fire(
            {
                text: message,
                icon: 'success'
            }
        );

    }


    //funcion  para el cambio de stado de favoritos
     const handleChangeFavStatus =(isFav, pubId, userId)=>{

        let url = 'http://localhost:8888/favoritos'
        
        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('pubId', pubId);

        let method = isFav ? 'DELETE' : 'POST'

        fetch(url, {
            method,
            body: formData,
            credentials: 'include'
        }).then(response => response.json() )
        .then(data =>{
            cargarListadoFotos();

                SweetAlert.fire({
                    title: data.message,
                    icon: 'success'
                }
            );
        })
    }

    const handleChangeAlertStatus = (isAlert, pubId, userId)=>{

        let url = 'http://localhost:8888/alerta'
        
        const formData = new FormData;
        formData.append('userId',userId);
        formData.append('pubId', pubId);

        let method = isAlert ? 'DELETE' : 'POST';


        fetch(url, {
            method,
            body: formData,
            credentials : 'include'
        }).then(response => response.json() )
        .then(data =>{
             cargarListadoFotos();
             SweetAlert.fire({
                     title: data.message,
                     icon: "success"
                    } 
                )
             })
        }
        


    const cargarListadoFotos = () =>{
    
        let endpoint = 'fotos';

            //pregunta si hay un usuario y si type es igual a mis publicaciones.
            //si hay ususario y quiere entrar a sus publicaciones 
            //recibe el id de usuario
            //si no devuelve el listado completo.
            //recibe los props de app.js

//Declato la variable de los filtros.
const filterParams = new URLSearchParams(props.filtros);//URLSerchParams contruye la expresion. son los que va a recibir concatenados a

        if( props.type === 'fotos' && props.searchPub){
            endpoint += '/search/' +props.searchPub;
        }
        else{
            if(props.user){
                 switch (props.type){
                     case 'mispublicaciones' :
                            endpoint += '/user/' + props.user.id;
                            break;

                    case 'favoritos' : 
                            endpoint = 'favoritos/' + props.user.id;

                            break;
                    
                    case 'alerta' : 
                        endpoint = 'alerta/' + props.user.id;
                 }
            }
        }

//ACA BUSCA EN FAVORITOS
 if(props.user){
     fetch( `http://localhost:8888/favoritos/${props.user.id}`).then(
         response => response.json()
     ).then(
         data =>{
                setFavoritos(data);

                fetch(`http://localhost:8888/${endpoint}?${filterParams}`).then(
                   response=> response.json()
                ).then(
                    data=>{
                        setFotos(data);
                    }
                )
         }
     )
 
 }else{
     
    fetch(`http://localhost:8888/${endpoint}?${filterParams}`).then(
        response=> response.json()
     ).then(
         data=>{
             setFotos(data);
         }
     )
 }

//ACA BUSCO ALERTAS 
 if(props.user){
     fetch(`http://localhost:8888/alerta/${props.user.id}`).then(
         response=> response.json()
         ).then(
             data=>{
                setAlerta(data);

                fetch(`http://localhost:8888/${endpoint}?${filterParams}`).then(
                    response=> response.json()
                ).then(
                    data=>{
                        setFotos(data)
                            }
                        )
                    }
                )
            
        }else{
            fetch(`http://localhost:8888/${endpoint}?${filterParams}`).then(
                    response=> response.json()
                ).then(
                    data=>{
                        setFotos(data)
                            }
                        )
        }
 }


useEffect(cargarListadoFotos , [props.user, props.searchPub, props.filtros]);


// esta funcion se llama desde el boton editar de TarjetaImagen que llama a handleEditClick
//recibe el id de la foto de onClickEdit en idPhoto
const handleEditClick = (idPhoto)=>{

    setSelectedFoto(idPhoto);// cuardo el id de la foto seleccionada 
    setShowFotosEditorModals(true); // muestra el modal    
}
//llama ala función de delete.
const handleDeleteClick = (idPhoto)=>{


    SweetAlert.fire({
        title: '¿Estas seguro que queres eliminar tu publicación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then( result=> {
        if(result.value){
            
            fetch(`http://localhost:8888/fotos/${idPhoto}`,
            {
                method: 'DELETE',
                credentials: 'include'
             }
            ).then( response => response.json()
            ).then(
                data=>{
                    if(data.status === 'ok'){
                        SweetAlert.fire({
                            text: data.message,
                            icon: 'success'
                        })
                        cargarListadoFotos();
                    }
                    else{
                        SweetAlert.fire({
                            text: data.message,
                            icon: 'error'
                        })
                    }
                }
            )
        }
    })
 
}

//Esta función ve si es favorito o no.
//Si la publicación esta dentro de la variable de estado favorito
//El metodo filter recorre las publicaciones y si son favoritos los mete en un array nuevo
const isUserFav = idPub =>{
    return ( favoritos.filter(favorito => idPub === favorito.id).length )
      
}

const isUserAlert = idPub =>{
    return (alerta.filter(alerta=> idPub === alerta.id).length);
}



//RETORNO DE LISTADOS FOTOS

    return(
        <>
        {props.type === "mispublicaciones" &&
        <NavBarMispublicaciones handleHideFotosEditorModal={onShowFotosEditorModals}/>
        }
           
   
         <Row className="ml-2 mr-2">

             {
                 
                 //recorre todo el array de productos ejecutando la funcion
                 // encada vuelta le paso una objeto a la funcion
                 //retorna un componente tarjeta foto en cada vuelta. 
                 //devuelve un array que mapea los elementos de fotos
                
                 fotos.map( foto=>{ 
                        return(
                            <TarjetaImagen  titulo={foto.titulo}
                                            autor={foto.usuario}
                                            foto={foto.foto}
                                            id={foto.id}
                                            type={props.type}
                                            onEditClick={handleEditClick}//el llamado viene de tarjeta imagen
                                            onDeleteClick={handleDeleteClick}
                                            user={props.user}
                                            isFav={ isUserFav(foto.id)}
                                            onChangeFavStatus={handleChangeFavStatus}
                                            isAlert={isUserAlert(foto.id)}
                                            onChangeAlertStatus={handleChangeAlertStatus}
                                            
                            />
                        )   
                    }
                 )
             }


         </Row>


         <FotosEditorModals show={ShowFotosEditorModal} 
                            handleHide={handleHideFotosEditorModal}
                            onFotoSaved={handleFotoSaved}// props. que se pasa a editorModal para que se cierre el modal cuando se carga 
                            idPhoto={selectedFoto}//tiene una variable de estado que viene de tarjetaImagen, que diferencia entre nuevo y editar 
                            />

         </>
    );
}

export default ListadoFotos;