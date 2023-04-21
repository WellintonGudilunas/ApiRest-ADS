const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    _id: Number,
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
}, {
    versionKey: false
});

ClienteSchema.pre('save', async function(next){
    const Model = mongoose.model('cliente', ClienteSchema);
    const objMaxId = await Model.findOne().sort({ '_id': -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    next();
});
module.exports = mongoose.model('cliente', ClienteSchema);
