const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemPedidoSchema = new Schema({
    _id: Number,
    teste: [{
        idProduto: { type: Object, required: true },
        quantidade: { type: Object, required: true }
    }]
}, {
    versionKey: false
});


itemPedidoSchema.pre('save', async function (next) {
    const Model = mongoose.model('itemPedido', itemPedidoSchema);
    const objMaxId = await Model.findOne().sort({ '_id': -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});


module.exports = mongoose.model('itemPedido', itemPedidoSchema);