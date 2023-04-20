const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemPedidoSchema = new Schema({
    // Criar Schema
});


module.exports = mongoose.model('itemPedido', ItemPedidoSchema);
