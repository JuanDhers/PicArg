import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../components/styles/TarjetaImagen.css';
// import iconoNofovotiro from '../like.png';
import iconofovotiro from '../likeRed.png';
import iconoNofovotiro from '../likeWhite.png';
import iconoAlert from '../alert.png';
import iconoAlertYellow from '../alertYellow.png';

import {Link} from 'react-router-dom';
import {fontAwesomeIcon, FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import SweeAlert from 'sweetalert2';

const TarjetaImagen = (props)=>{

    const handleEditClick = ()=>{
        
        //recibe el id de la publicación 
        //onEditClick viene como props de listado producto
        props.onEditClick(props.id);
    }

    //Funcion llamada a Eliminar publicación.
    const handleDeleteClick = ()=>{
        props.onDeleteClick(props.id);
    }

    const handleFavClick = ()=>{
         props.onChangeFavStatus(props.isFav, props.id, props.user.id); // se pasa a listado de productos.
    }

    const handleAlertClick = () =>{
        props.onChangeAlertStatus(props.isAlert, props.id, props.user.id);
    }

    return(
 
<Col md={4} lg={3} xs={12} xl={4} className=" p-1 d-flex align-items-stretch justif-content-center">

        <div class="wrapper">
                            <Link to={"/fotos/" + props.id} className="nav-link p-0">
                                <img src={props.foto} className="card-img-top"></img>
                            </Link>           
         
            <div class="overlay">
            
                <div class="content">
                    <a>{props.titulo}</a>
                        <a>{(props.type === 'fotos' || props.type === 'favoritos' ) && props.user &&
                                    <>
                                            <img className="aDeLike" style={{cursor:'pointer'}}
                                            src={props.isFav ? iconofovotiro : iconoNofovotiro}
                                            onClick={ handleFavClick} alt="Like">                                       
                                            </img>

                                            <img className="aDeLike" style={{cursor:'pointer'}}
                                            src={props.isAlert ? iconoAlertYellow : iconoAlert  }
                                            onClick={handleAlertClick}>                                       
                                            </img>
                                    </>

                            }</a>

                            <a> {(props.type === 'mispublicaciones' || props.type === 'alerta') &&
                                <>
                            <FontAwesomeIcon className="BtnEdit" icon={faEdit} onClick={handleEditClick} />

                            <FontAwesomeIcon className="BtnTrash" icon={faTrash} onClick={handleDeleteClick} />
        
                                </>
                            }</a>


                </div>

            </div>

        </div>

        </Col>

    );
}

export default TarjetaImagen;





