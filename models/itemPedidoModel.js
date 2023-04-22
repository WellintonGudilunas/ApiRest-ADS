const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemProdutoSchema = new Schema({
    _id: Number,
    idProduto: Number,
    quantidade: Number

}, {
    versionKey: false
});


itemProdutoSchema.pre('save', async function (next) {
    const Model = mongoose.model('itemProduto', itemProdutoSchema);
    const objMaxId = await Model.findOne().sort({ '_id': -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});


module.exports = mongoose.model('itemProduto', itemProdutoSchema);