import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {fontAwesomeIcon, FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faCloudDownloadAlt, faMugHot, faComment, faShare, faShareSquare, faShareAltSquare, faCloudUploadAlt, faUpload} from '@fortawesome/free-solid-svg-icons';
import '../components/styles/NavBarMispublicaciones.css'


const NavBarMispublicaciones = (props)=>{

    return (
        <>
        <h3>Mis Publicaciones</h3>
        <Row className="my-3">
            <Col>
            <Button className="btn-publicacion ml-4"
                onClick={props.handleHideFotosEditorModal}

                ><FontAwesomeIcon icon={faUpload} style={{marginRight:"5px"}} />Subir Publicación</Button>
            </Col>

        </Row>
        </>

    );

}

export default NavBarMispublicaciones;