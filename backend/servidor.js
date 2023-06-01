require("./db/mongo");
const express = require("express");
const srv = express();
srv.use(express.json());
const cors = require("cors")

srv.use(cors());

const produtoRouter = require('./routes/produtoRouter');
const clienteRouter = require('./routes/clienteRouter');
const pedidoRouter = require('./routes/pedidoRouter');
//srv.use('/', (req, res) => res.sendFile("\\index.html"));
srv.use('/produtos', produtoRouter);
srv.use('/clientes', clienteRouter);
srv.use('/pedidos', pedidoRouter);

srv.listen(3005, function(){
    console.log('Servidor rodando em http://localhost:3005');
});