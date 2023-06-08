import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/paginas/Home';
import Clientes from './components/paginas/Clientes';
import Produtos from './components/paginas/Produtos';
import Pedidos from './components/paginas/Pedidos';
import Util from './components/paginas/Util';
import Sobre from './components/paginas/Sobre';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/cadastros/clientes' element={<Layout><Clientes/></Layout>} />
          <Route path='/cadastros/produtos' element={<Layout><Produtos/></Layout>} />
          <Route path='/cadastros/pedidos' element={<Layout><Pedidos/></Layout>} />
          <Route path='/util' element={<Layout><Util/></Layout>} />
          <Route path='/sobre' element={<Layout><Sobre/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;
