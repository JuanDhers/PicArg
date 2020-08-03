import React from 'react';
import '../components/styles/Footer.css';


// Recibe el props pasado como parametro desde App.js
function Footer(props){
return(
    <footer className="mt-1 mb-0">
    <p>{props.copyRight}</p>
    </footer>
)
};

export default Footer;