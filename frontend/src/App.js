import React, {useState} from 'react';
import Footer from '../src/components/Footer';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';
import ListadoFotos from './components/ListadoFotos';
import FotosDetails from './components/FotosDetails';
import MiCuenta from './components/MiCuenta';
import Portada from './components/Portada';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

//el atributo copyRight se pasa como props a parametro de Footer.js
function App() {
 const [usuario, setUsuario] = useState(null);

 const [searchPub, setSearchPub] = useState (null);


 const [filtros, setFiltros] = useState ({
            categoria : '',

 });

 const onLoginSuccess = (loggedUser) => {
   setUsuario(loggedUser)
 }

 const onLogOut = ()=>{
   let url = "http://localhost:8888/auth";

   fetch(url, {
     method: 'DELETE',
     Credential: 'include'
   }
   ).then(response => response.json() 
   ).then(data => {
                    setUsuario(null);//al poner usuario en null se sale del usuario.  
                  }
   )
  }


  //BUSQUEDA

  const handleSearchPubs = (terminoBuscado)=>{
    
    if(terminoBuscado === ''){
      terminoBuscado = null;
    }


    setSearchPub(terminoBuscado)

  }

  const handleFilterChange = filtros =>{
    setFiltros(filtros);
    
  }

  return (
    <Router>
    
          <NavigationBar  user={usuario}
                          handleLoginSuccess = {onLoginSuccess} //cuando el usuario este logeado correctamente se llama a la funcion
                          handleLogOut = {onLogOut} // envia como prop a navigatioonbar y cada vez que hay clic en cerrar sesion se llama a la funcion
                       />      

    <Switch>
      <Route exact path="/" 
      children={
          <>

          <Hero onSearchPubs={handleSearchPubs} 
                filtros={filtros}
                type="fotos"
                onFilterChange={handleFilterChange}/>{/* filtros */}
                


          <ListadoFotos type="fotos"
                        user={usuario}
                        searchPub={searchPub}
                        filtros={filtros}
                        onFilterChange={handleFilterChange}/>{/* filtros */}

          <Footer copyRight="© 2020 Copyright: PicArg.com"/>
          </>
        }
      />
      <Route exact path="/fotos/:id"
              children={
               <>
                    <Hero onSearchPubs={handleSearchPubs} 
                          filtros={filtros}
                          onFilterChange={handleFilterChange}/>{/* filtros */}

                    <FotosDetails />
                    <Footer copyRight="© 2020 Copyright: PicArg.com"/>
               </>
              }  
      />
          { usuario &&
              <>
                      <Route  exact path="/mispublicaciones"
                              children={
                                  <>

                                        <Hero onSearchPubs={handleSearchPubs} 
                                              filtros={filtros}
                                              onFilterChange={handleFilterChange}/>
                
                                        <ListadoFotos type="mispublicaciones"
                                                      user={usuario}
                                                      searchPub={searchPub}
                                                      filtros={filtros}
                                                      onFilterChange={handleFilterChange}/>
                              
                                        <Footer copyRight="© 2020 Copyright: PicArg.com"/>
                                  </>
                                        }
                        />

                        <Route exact path="/favoritos"
                             children={
                                  <>
                                          <Hero onSearchPubs={handleSearchPubs} 
                                                filtros={filtros}
                                                onFilterChange={handleFilterChange}/>{/* filtros */}

                                               <h2>Mis Favoritos</h2>
                                          <ListadoFotos type="favoritos"
                                                        user={usuario}
                                                        searchPub={searchPub}
                                                        filtros={filtros}
                                                        onFilterChange={handleFilterChange}/>
 
                                          <Footer copyRight="© 2020 Copyright: PicArg.com"/>
                                   </>
                                      }
                        />

                        <Route  exact path="/micuenta"
                              children={
                                  <>
                                      <MiCuenta/>
                              
                                        <Footer copyRight="© 2020 Copyright: PicArg.com"/>
                                  </>
                                        }
                          />

                          <Route exact path ="/alerta"
                                children={
                                  <>

                                  <ListadoFotos type="alerta"
                                                user={usuario}
                                                searchPub={searchPub}
                                                filtros={filtros}
                                                onFilterChange={handleFilterChange}/>
                                                </>
                                   }
                          />
          
              </>
          }

                
               


                


    <Redirect to={{pathname: "/" }}></Redirect>
    </Switch>

    </Router>
  );
}

export default App;
