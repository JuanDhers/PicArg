import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../components/styles/MiCuenta.css';

const MiCuenta = ()=>{
    return(
        <Row className="RowMicuenta"> 
            <Col lg={6} md={6} xs={12} className="ColMicuenta">
                <h4>Datos del perfil</h4>
                <Col md={8}>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <Form.Label className="formMicuenta">Nombre</Form.Label>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Apellido</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>



                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Provincia</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Ciudad</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>


                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Fecha de nacimiento</p>
                    </InputGroup.Prepend>

                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                    </Form.Control>

                    <Form.Control as="select">
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                        <option>Abril</option>
                        <option>Mayo</option>
                        <option>Junio</option>
                        <option>Julio</option>
                        <option>Agosto</option>
                        <option>Septiembre</option>
                        <option>Octubre</option>
                        <option>Noviembre</option>
                        <option>Diciembre</option>
                    </Form.Control>

                    <Form.Control as="select">
                        <option>1984</option>
                        <option>1985</option>
                        <option>1986</option>
                        <option>1987</option>
                        <option>1988</option>
                        <option>1989</option>
                        <option>1990</option>
                        <option>1991</option>
                        <option>1992</option>
                        <option>1993</option>
                        <option>1995</option>
                        <option>1996</option>
                        <option>1997</option>
                        <option>1998</option>
                        <option>1999</option>
                        <option>2000</option>
                        <option>2001</option>
                        <option>2002</option>
                    </Form.Control>

                </InputGroup>


                </Col>

            </Col>

            <Col lg={6} md={6} xs={12} className="ColMicuenta">

                <h4>Datos online</h4>
                <Col md={8}>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <Form.Label className="formMicuenta">Facebook</Form.Label>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Instagram</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Twitter</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuenta">Website</p>
                    </InputGroup.Prepend>
                    <FormControl />
                </InputGroup>
               
                </Col>
                
                
               


                </Col>

                <Col lg={6} md={6} xs={12} className="ColMicuenta">

                    <h4>Opciones de Cobro</h4>
                    <Col md={10}>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend className="mr-3">
                        <p className="formMicuentaMP">Mail mercado pago</p>
                    </InputGroup.Prepend>
                    <FormControl />
                    </InputGroup>
                    </Col>   

                </Col>

        </Row>
    );
}

export default MiCuenta;