const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    codigo: {
        type:Number,
        required : [true, "Codigo cliente faltando"]
    },
    nome: {
        type:String,
        required : [true, "Nome cliente faltando"]
    },
    idade: {
        type:Number,
        required : [true, "Idade cliente faltando"]
    },
    cep: {
        type:String,
        required : [true, "CEP cliente faltando"]
    }
});


module.exports = mongoose.model('cliente', ClienteSchema);
