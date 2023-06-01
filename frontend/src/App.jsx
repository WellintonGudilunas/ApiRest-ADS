import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import Clientes from './paginas/Clientes';
import Produtos from './paginas/Produtos';
import Montagem from './paginas/Montagem';
import Util from './paginas/Util';
import Sobre from './paginas/Sobre';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/clientes' element={<Layout><Clientes/></Layout>} />   
          <Route path='/produtos' element={<Layout><Produtos/></Layout>} />        
          <Route path='/montagem' element={<Layout><Montagem/></Layout>} />
          <Route path='/util' element={<Layout><Util/></Layout>} />
          <Route path='/sobre' element={<Layout><Sobre/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;
