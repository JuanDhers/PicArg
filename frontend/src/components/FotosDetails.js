import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';
import '../components/styles/FotoDetails.css';
import {fontAwesomeIcon, FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faCloudDownloadAlt,faCloudUploadAlt, faMugHot, faComment, faShare, faShareSquare, faShareAltSquare} from '@fortawesome/free-solid-svg-icons';


const FotosDetails = ()=>{

    let {id} = useParams(); //devuelve el id para usar en el fetch

    let [foto, setFoto] = useState([]);

    useEffect(

        ()=>{
            fetch('http://localhost:8888/fotos/' + id).then(
                response => response.json()
            ).then(data =>{
                setFoto(data);
                console.log(data)
                }
            )
        }, [] //corta el ciclo de actualización que entra en un bucle.
    )
    //
    return(
        <Row className="fondoColor">
            <Col md={9}>
                <img src={foto.foto} className="img-fluid" style={{width:"100%"}}/>
            </Col>

            <Col md={3}>
                <h2 >Título: {foto.titulo}</h2>
                <h4 style={{marginBottom:"20px"}}>Descripción: {foto.usuario}</h4>

                <a href="http://mpago.la/1rq7ipj" target="_blank"><Button className="mb-3 mr-2 btncafe"><FontAwesomeIcon icon={faMugHot} style={{marginRight:"5px"}} />Café</Button></a>

                <Button className="mb-3 ml-1"><FontAwesomeIcon icon={faComment} style={{marginRight:"5px"}} />Mensaje</Button>
       
                <a download href="http://localhost:3000/fotos/16"> <Button size="lg" block m-2  variant="success"><FontAwesomeIcon icon={faCloudDownloadAlt} style={{marginRight:"20px"}} />Descargar</Button></a>

            
            </Col>
        </Row>

    );
}

export default FotosDetails;