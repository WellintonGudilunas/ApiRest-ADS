const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
    codigo: {
        type:Number,
        required : [true, "Codigo produto faltando"]
    },
    nome: {
        type:String,
        required : [true, "Nome produto faltando"]
    },
    estoque: {
        type:Number,
        required : [true, "Estoque produto faltando"]
    },
    descricao: {
        type:String,
        required : [true, "Descrição produto faltando"]
    },
    img: {
        data: Buffer,
        contentType: String
    }
});


module.exports = mongoose.model('produto', ProdutoSchema);
