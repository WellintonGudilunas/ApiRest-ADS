const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
    _id: Number,
    nome: {
        type: String,
        required: [true, "Nome produto faltando"]
    },
    estoque: {
        type: Number,
        required: [true, "Estoque produto faltando"]
    },
    preco: {
        type: Number,
        required: [true, "Preço do produto faltando"]
    },
    descricao: {
        type: String,
        required: [true, "Descrição produto faltando"]
    },
    img: {
        data: Buffer,
        contentType: String
    },
}, {
    versionKey: false
});

ProdutoSchema.pre('save', async (next) => {
    const Model = mongoose.model('produto', ProdutoSchema);
    const objMaxId = await Model.findOne().sort({ "_id": -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});

module.exports = mongoose.model('produto', ProdutoSchema);