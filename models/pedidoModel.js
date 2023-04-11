const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    codigo: Number,
    codigoCliente: Number,
    codigoProduto: Array,
    quantidade: Array   
});


module.exports = mongoose.model('pedido', PedidoSchema);
