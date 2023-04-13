const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    codigo: Number,
    codigoCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: [true, "Coloca o código do cliente ai chxará"]
    },
    codigoProduto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto',
    }],

    quantidade: Array,   
    data: {
        type: Date,
        default: Date.now()
    },

});


module.exports = mongoose.model('pedido', PedidoSchema);
