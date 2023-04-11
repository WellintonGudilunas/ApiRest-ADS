const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    codigo: Number,
    nome: String,
    idade: Number,
    cep: String
});


module.exports = mongoose.model('cliente', ClienteSchema);
