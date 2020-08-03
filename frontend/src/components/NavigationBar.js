import React, {useState} from 'react'; //tiene importado el hook useState mediante destructuring
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import  '../components/styles/NavigationBar.css';
import logoPicArg from '../logoPicArgW.svg';
import UserLog from '../UserLog.png';
import Button from 'react-bootstrap/Button';
import LoginModals from './LoginModals';
import {Link} from 'react-router-dom'
import RegistrerModals from './RegistrerModals';
// import Hero from './Hero'

const NavigationBar= (props)=>{

//useState es una funcion que recibe un estado inicial
//useState devuelve la variable de estado que recibe HandleShowLoginModals
// setShowLoginModals modifica el estado cuando se llama en HandleShowLoginModals

const [ShowLoginModals,setShowLoginModals] = useState(false) //hace el manejo de si el modal se ve o no
const [ShowRegistrerModals, setShowRegistrerModals] = useState(false) //hace el manejo de si el modal se ve o no
                                                                 
const handleShowLoginModals =()=>{
    setShowLoginModals(true);
}

const handleHide =()=>{
    setShowLoginModals(false);
}


const handleShowRegistrerModals =()=>{
    setShowRegistrerModals(true);
}

const handleHideRegistrerModals =()=>{
    setShowRegistrerModals(false);
}


 
    return(
        <>

<   Navbar className="navegador" expand="lg">
            
            <Link to={"/"} className="navbar-brand">
                <img className="logo" src={logoPicArg} alt="Logo PicArg"></img>
            </Link> 

            
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"> 

        <Nav className="mr-auto">
            <Nav.Link className="navLink" href="#">Fotos</Nav.Link> 
            <Nav.Link className="navLink" href="#">Galerías</Nav.Link>
            <Nav.Link className="navLink" href="#">Fotógrafos</Nav.Link>
        </Nav>    

        { !props.user
        ? 
            <>
        <Button alignRight className="btnLogin"
        onClick={handleShowLoginModals}   //Llamada al HandleShowLoginModals
        >Ingresa</Button>
    
        <Button className="btnRegistro"
        onClick={handleShowRegistrerModals}>Registrate</Button>
        </>
            :
         <>   

<Dropdown alignRight title={props.user.nombre} >
  <Dropdown.Toggle className="log"  id="dropdown-basic">
  <img src={UserLog} alt="Logo usuario Logeado"></img>
  </Dropdown.Toggle>

  <Dropdown.Menu>
      
  {props.user.id === 1 ?

    <Dropdown.Item href="#/action-3">
        <Link to="/alerta" className="nav-Link">Alerta</Link>
    </Dropdown.Item>
        :
    <>
    <Dropdown.Item href="#/action-1">
        <Link to="/mispublicaciones" className="nav-Link">Mis publicaciones</Link>
    </Dropdown.Item>

    <Dropdown.Item href="#/action-2">
        <Link to="/favoritos" className="nav-Link">Mis favoritos</Link>
    </Dropdown.Item>
    
    <Dropdown.Item href="#/action-3">
        <Link to="/micuenta" className="nav-Link">Mi Cuenta</Link>
    </Dropdown.Item>
    </>
    
    }
    
    <Dropdown.Divider/>

    <Dropdown.Item onClick={props.handleLogOut}>Cerrar Sesión</Dropdown.Item>

  </Dropdown.Menu>
</Dropdown>


        </>
    }
  </Navbar.Collapse>
</Navbar>

<LoginModals    show={ShowLoginModals} //muestra el modal
                handleHide={handleHide} //esconde el modal
                handleLoginSuccess={props.handleLoginSuccess} // lo que recibe navitagationbar lo paso a loginModal
/>

<RegistrerModals    showRegistrer={ShowRegistrerModals} 
                    handleHideRegister={handleHideRegistrerModals}
                    handleRegistrerSuccess={props.handleRegistrerSuccess}
                    />

</>
    )
}

export default NavigationBar;