require("./db/mongo");
const express = require("express");
const srv = express();
srv.use(express.json());

//Roteamento das rotas de conteúdo
const produtoRouter = require('./routes/produtoRouter');
const clienteRouter = require('./routes/clienteRouter');
const pedidoRouter = require('./routes/pedidoRouter');
srv.use('/produtos', produtoRouter);
srv.use('/clientes', clienteRouter);
srv.use('/pedidos', pedidoRouter);

srv.listen(3000, function(){
    console.log('Servidor rodando em http://localhost:3000');
});