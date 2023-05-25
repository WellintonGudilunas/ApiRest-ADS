import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import TemQueCePascal from './components/asd';
import Cadastros from './Cadastro';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
    <App />
    <Cadastros/>
    <TemQueCePascal />
    </>
);