const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
    codigo: Number,
    nome: String,
    estoque: Number,
    descricao: String,
    img: String
});


module.exports = mongoose.model('produto', ProdutoSchema);
