import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SweetAlert from 'sweetalert2';

const LoginModals = (props)=>{

    //funcion que maneja el envio del inicio de sesión
    const handleLoginClick = ()=>{

        //defino la dirección del servidor
        let url = 'http://localhost:8888/auth';

        //los recibe los parametros y van a ser pasados a altributo body del fetch
        let params = {
            user: nombreUsuario,
            password: password
        };

        //fetch hasta la url
        //recibe como parametros el metodo por el cual se va a hacer el login
        fetch(url, {
                method : 'POST',
                credentials : 'include',
                body: JSON.stringify( params),
                headers: {
                            'content-type' : 'application/json' //acá tuve un error de tipeo 
                                                                //y no recibia el parametro
                         }
                    }
            ).then( response => response.json()
            ).then( data => {
                //verifico el status del login
                if( data.status === 'ok'){
                    props.handleLoginSuccess(data.loggedUser);//lo recibe de session_routes
                    //llama a la funcion handleHide declarada en NavigationBar para que se cierre el modal
                     props.handleHide();
                }
                else{
                    SweetAlert.fire({
                        text: data.message,
                        icon: 'error'
                    })
                    // alert(data.message); 
                }
            });

        }

        const [nombreUsuario, setNombreUsuario] = useState('');

        const [password, setPassword] = useState('');

        const handleUserNameChange =(event)=>{
            setNombreUsuario(event.target.value);//event.target.value pone en setNombreUsuario
                                                // el valor que se escribe en la caja de texto de nombre de usuario
        }

        const handlePasswordChange =(event)=>{
            setPassword(event.target.value);//event.target.value pone en setPassword
                                                // el valor que se escribe en la caja de texto de nombre de usuario
        }


    return(
        <Modal size="sm" show={props.show} onHide={props.handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control   type="text"       
                                    value={nombreUsuario}
                                    onChange={handleUserNameChange}
                                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control   type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary"
                //recibe el valor desde navigationBar
                onClick={props.handleHide}>Cancelar</Button>

                <Button variant="primary"
                        //onClcik recibe la funcion que se encarga de manejar el aceptar.
                        onClick={handleLoginClick}
                        
                        >Ingresar</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default LoginModals;

//