const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemPedidoSchema = new Schema({
    _id: Number,
    coisasCompradas: [{
        _id: Number,
        idProduto: { type: Number, ref:'produto', required: true },
        quantidade: { type: Number, required: true }
    }]
}, {
    versionKey: false
});


ItemPedidoSchema.pre('save', async function (next) {
    const Model = mongoose.model('itemPedido', ItemPedidoSchema);
    const objMaxId = await Model.findOne().sort({ '_id': -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});


module.exports = mongoose.model('itemPedido', ItemPedidoSchema);