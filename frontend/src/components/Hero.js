import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components/styles/Hero.css';
import PubFilter from './PubFilter';

import {useHistory} from "react-router-dom";

const Hero = (props)=>{

    const history = useHistory();

    const [terminoBuscado, setTerminoBuscado] = useState('');

    const handleTerminoBuscadoChange = (event)=>{

        history.push("/");

        let busqueda = event.target.value;
        setTerminoBuscado(busqueda);

        props.onSearchPubs(busqueda)
    }

    const handleFilterChange = filtros =>{
        props.onFilterChange(filtros)}

    return(
        <>
        {props.type === 'fotos' ?
        
        <>
        
        <div className="Hero">
            <h1 className="heroh1">Descubrí las mejores imágenes</h1>
        
        <Row className="justify-content-center" style={{width:"100%"}}>
            <Col xs={10} md={8} lg={6}>
        <InputGroup className="inputNavHero">
    
        <FormControl className="inputNavHero1" variant="" 
                     type= "text"
                     value={terminoBuscado}
                     onChange={handleTerminoBuscadoChange}
                    />

        <PubFilter onFilterChange={handleFilterChange}/>

        </InputGroup>
        </Col>
        </Row>
        <p className="heroP">Contactá a los mejores fotógrafos, descargá y subí fotos.</p>
        </div>
        </>
        :
        <>

        <Row className="justify-content-center pt-2 ml-0 mr-0 pl-0 pr-0" style={{backgroundColor:"#2b8cbe"}}>
            <Col xs={10} md={8} lg={6}>
        <InputGroup className="inputNavHero">
    
        <FormControl className="inputNavHero1" variant="" 
                     type= "text"
                     value={terminoBuscado}
                     onChange={handleTerminoBuscadoChange}
                    />

        <PubFilter onFilterChange={handleFilterChange}/>

        </InputGroup>
        </Col>
        </Row>
        </>
        }  
    </>
    )
}

export default Hero;
