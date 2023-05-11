const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    _id: Number,
    idCliente: {
        type: Number,
        ref: 'cliente',
        required: [true, "Coloca o código do cliente ai chxará"]
    },
    idItensPedido:{
        type: Number,
        ref:'itemPedido',
        required: [true, "Faltou os items do pedido"]
    },
    valorTotal: Number,
    data: {
        type: Date,
        default: Date.now()
    },

}, {
    versionKey: false
});


PedidoSchema.pre('save', async function (next) {
    const Model = mongoose.model('pedido', PedidoSchema);
    const objMaxId = await Model.findOne().sort({ '_id': -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});


module.exports = mongoose.model('pedido', PedidoSchema);
