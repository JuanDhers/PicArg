import React, {useState}  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SweeAlert from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RegistrerModals = (props)=>{


    const [mailUsuario, setMailUsuario] = useState('');

    const [passwordUsuario, setPasswordUsuario] = useState('');

    const [nombreUsuario, setNombreUsuario] = useState('');

    const [apellidoUsuario, setApellidoUsuario] = useState('');

    const handleMailChange = (event)=>{
        setMailUsuario(event.target.value);
   
    }

    const handlePasswordChange = (event)=>{
        setPasswordUsuario(event.target.value);
    }

    const handleNombreChange = (event)=>{
        setNombreUsuario(event.target.value);
    }

    const handleApellidoChange = (event)=>{
        setApellidoUsuario(event.target.value);
    }


    const handleSaveRegistrerModalsClick = ()=>{

        const formData = new FormData();

        formData.append('mailUsuario', mailUsuario);
        formData.append('passwordUsuario', passwordUsuario);
        formData.append('nombreUsuario', nombreUsuario);
        formData.append('apellidoUsuario', apellidoUsuario);

        fetch('http://localhost:8888/registro', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(response => response.json() )
            .then(data =>{
                if(data.status === 'ok'){
                SweeAlert.fire({
                    title: data.message,
                    icon: 'success'
                })
                props.handleHideRegister();
            }else{
                SweeAlert.fire({
                    title: data.message,
                    icon: 'error'
                })
                props.handleHideRegister();
            }
        })
    }

    return(
        

        <Modal show={props.showRegistrer} onHide={props.handleHideRegister}>
        <Modal.Header closeButton>
            <Modal.Title>Registro de Usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <Form.Group>
            <Row>
                <Col>
                <Form.Label>Nombre</Form.Label>
                    <Form.Control   type="text"       
                                    value={nombreUsuario}
                                    onChange={handleNombreChange}
                                    />

                </Col>
                <Col>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control   type="text"       
                                    value={apellidoUsuario}
                                    onChange={handleApellidoChange}
                                    />
                </Col>
            </Row>
        </Form.Group>
        
        <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control   type="text"       
                                value={mailUsuario}
                                onChange={handleMailChange}
                                />
        </Form.Group>

            <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control   type="password"
                                value={passwordUsuario}
                                onChange={handlePasswordChange}
                                />
            </Form.Group>

        </Modal.Body>
           
        <Modal.Footer>
            
            <Button variant="secondary"
            onClick={props.handleHideRegister}
            //recibe el valor desde navigationBar onClick={props.handleHide}
            >Cancelar</Button>

            <Button variant="primary"
                    // onClcik recibe la funcion que se encarga de manejar el aceptar.
                    onClick={handleSaveRegistrerModalsClick}
                    
                    >Registrar</Button>
        </Modal.Footer>


    </Modal>

    )
}

export default RegistrerModals;


/*


                    <Form.Group>
                <Form.Label>Ingresá tu E-mail</Form.Label>
                <Form.Control   type="text"       
                                value={nombreUsuario}
                                onChange={handleUserNameChange}
                                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Ingresa tu contraseña</Form.Label>
                <Form.Control   type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                />
            </Form.Group>







*/