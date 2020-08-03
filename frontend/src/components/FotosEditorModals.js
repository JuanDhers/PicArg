import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'sweetalert2';

const FotosEditorModals = (props) =>{

//Decalaración de las variables de estado
const [fotoTitulo, setFotoTitulo] =useState('');
const [fotoPrecio, setFotoPrecio] = useState('');
const [fotoImage, setFotoImage] = useState('');
const [previewFotoImage, setpreviewFotoImage] = useState('');

const [fotoCategory, setFotoCategory] = useState('');//es velue del control. 
const [categorias, setCategorias] = useState([{id:'', nombre:'Todas'}]);


//Carga las categorias
useEffect(()=>{
    fetch('http://localhost:8888/categorias')
    .then( response => response.json()
    ).then(
        dataCategorias =>{
            setCategorias(dataCategorias);
        }
    )
}, [])


const categoriasOptions = ()=>{
    let categories = categorias.map( categoria =>{
        return (
            <option value={categoria.id}>
                {categoria.nombre}
            </option>
        )
    }) 

    return categories;
}

const handleCategoriChange = (event)=>{
    setFotoCategory(event.target.value);
}



const handleFotoNameChange = (event)=>{
    //para saber que evento llama a la función 
       setFotoTitulo (event.target.value);//toma el valor cada vez que cambia la caja de texto y lo pone dentro de la variable de estado.
    }

//recibe el evento onChange evento 
const handleFotoPrecioChange = (event)=>{
//para saber que evento llama a la función 
   setFotoPrecio (event.target.value);//toma el valor se qeda con la primera foto y lo pone dentro de la variable de estado.
}


const handleFotoImageChange = (event)=>{
     //para saber que evento llama a la función 
      setFotoImage (event.target.files[0]);//toma el valor cada vez que cambia la caja de texto y lo pone dentro de la variable de estado.
       
      setpreviewFotoImage(URL.createObjectURL(event.target.files[0])); //obtengo el archivo aue se esta por cargar 
                                                                        //URL.createObjectURL crea el objeto con la 
                                                                        //dirección que recibe de event.target
        }


    //envio de la carga de la foto, manda a guardar.
const handleSave = () =>{
   const formData = new FormData(); //recibe el paquete con el titulo, el precio y la imagen.

   formData.append('fotoTitulo', fotoTitulo);
   formData.append('fotoPrecio', fotoPrecio);
   formData.append('fotoImage', fotoImage);
   formData.append('fotoCategory', fotoCategory);

   let url = 'http://localhost:8888/fotos'; //url que se le pasa al fetch
   let method = 'POST';

   //aca pregunto si ya tiene idPhoto, de ser así se implementa un put para que se cambie.
   //la funcionalidad put esta implementada en el back src/routes/fotos_routes
    if(props.idPhoto){
        url += '/' + props.idPhoto; // le paso a la url el producto que se quiere editar
        method = 'PUT'; //le paso el method para hacer un cambio no una insercion
    }
   fetch(url, {
       method: method,
       body: formData,  
       credentials: 'include'
   })
   .then( response => response.json() )
   .then( data => {
       //si el estado de carga es ok da mensaje de carga correcta
       if(data.status === 'ok'){
           //llama a la función onFotoSaved que esta en el padre (ListadoFotos), 
           //para que se cierre el modal si se cargo ok
           // pasa también como el mesanje de carga ok.
           props.onFotoSaved(data.message)
       }
       // en caso de error avisa.
       else{
        SweetAlert.fire({
            text: data.message,
            icon: 'error'
        })
       }
   })
   .catch( error => {
       console.log('Error!!!');
   })
}

//Esta función lo que hace es diferenciar si una foto se esta cargando o se esta modificando
//props.idPhoto viene de listadoFotos
useEffect(
    ()=>{
        if (props.idPhoto){
            //uso el endpoint
            fetch(`http://localhost:8888/fotos/` + props.idPhoto).then(
                response => response.json()
            ).then(
                data =>{
                    setFotoTitulo(data.titulo);
                    setFotoPrecio(data.usuario);
                    setFotoImage('');
                    setpreviewFotoImage(data.foto);
                    setFotoCategory(data.categoria);
                }
            )

        }
        else{
            //setea todos los campos del modal para que esten en blanco cuando se va cargar una imagen
            setFotoTitulo('');
            setFotoPrecio('');
            setFotoImage('');
            setpreviewFotoImage('');
            setFotoCategory('');
        }
    },[props.idPhoto]// hace que vuelva a cargar solo si se cambia el id de producto -
)

//RETORNO DE FOTOS EDITOR MODAL
return(

    <Modal show={props.show} onHide={props.handleHide}>
        <Modal.Header closeButton>
            <Modal.Title>Publicación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Titulo</Form.Label>

                    <Form.Control 
                                type="text"
                                value={fotoTitulo}
                                onChange={handleFotoNameChange}
                                />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>

                    <Form.Control 
                                type="text"
                                value={fotoPrecio}
                                onChange={handleFotoPrecioChange}
                                />
                </Form.Group>
                {/* Previsualización de la imgena a cargar */}
                <Form.Group className="d-flex justify-content-center">
                    {previewFotoImage && 
                    <img style={{height: "25vh"}} src={previewFotoImage}/>
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categorias</Form.Label>
                    <Form.Control  as="select"
                                    onChange={handleCategoriChange}
                                    value={fotoCategory}>

                        {categoriasOptions()}

                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>imagen</Form.Label>

                    <Form.Control   type="file"
                                    onChange={handleFotoImageChange}
                                />
                </Form.Group>

            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary">
                Cancelar
            </Button>

            <Button variant="success"
                    onClick ={handleSave}// cuando hacen click llama a ala función que guarda el estado.
                    >
                Subir
            </Button>

        </Modal.Footer>

    </Modal>
);
}

export default FotosEditorModals