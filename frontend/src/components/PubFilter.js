import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../components/styles/PubFilter.css'

const PubFilter = (props) =>{

    const [categorias, setCategorias] = useState([{id:'', nombre:'Todas'}]);

// La uso como referencia al control para que cuando cambie el filtro traiga el cambio    
    const categoriaRef = useState('null');  // esta vinculada al select.
    // const precioDesdeRef = useState('null');
    // const precioHastaRef = useState('null');
    // const ordenRef = useState('null');
                

    useEffect(()=>{
        fetch('http://localhost:8888/categorias')
        .then( response => response.json()
        ).then(
            dataCategorias =>{
                setCategorias(dataCategorias);
            }
        )
    },[])

    const categoriasOptions = ()=>{
        let categories = categorias.map( categoria =>{
            return (
                <option value={categoria.id}>
                    {categoria.nombre}
                </option>
            )
        })

        categories.unshift(<option value=''>Todas</option>); //esta linea agrega al desplegable de categorias Todas

        return categories;
    }

    const handleFilterChange = () =>{

        props.onFilterChange(
            {
                categoria:   categoriaRef.current.value,

            }
        )
        
    }

    return(
            <Row>
                  

                                    <Form.Group>
                                        {/* <Form.Label>Categorias</Form.Label> */}
                                        <Form.Control  className="filtroCategorias"  as="select"
                                                        onChange={handleFilterChange}
                                                        ref={categoriaRef}>
                                                        {categoriasOptions()}

                                        </Form.Control>
                                    </Form.Group>
  
            </Row>

    );

}

export default PubFilter;