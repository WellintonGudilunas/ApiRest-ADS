const clienteModel = require('../models/clienteModel');

class clienteController{

    async listar(req, res){  
        //select * from cliente;  
        const resultado = await clienteModel.find({});
        res.json(resultado);    
    }

    async buscarPorCodigo(req, res){
        const codigo  = req.params.codigo;
        //select * from cliente where codigo = 2;
        const resultado = await clienteModel.findOne({'codigo': codigo});
        res.json(resultado);
    }

    async salvar(req, res){
        const cliente = req.body;

        //Gerador de novo código
        //select * from cliente order by codigo desc;
        const objeto = await clienteModel.findOne({}).sort({'codigo': -1});
        cliente.codigo = objeto == null ? 1 : objeto.codigo + 1;

        //insert into cliente (xxx) values (xxxx);
        const resultado = await clienteModel.create(cliente);
        res.json(resultado);        
    }

    async atualizar(req, res){
        const codigo = req.params.codigo;
        const cliente = req.body;
        //update cliente set xxxx values xxxx
        await clienteModel.findOneAndUpdate({'codigo': codigo}, cliente);
        res.send("Conteúdo atualizado!");
    }

    async excluir(req, res){
        const codigo = req.params.codigo;
        const retorno = await clienteModel.findOneAndDelete({'codigo': codigo});
        if(retorno == null){
            res.send("Conteúdo não encontrado");
            return;
        }
        res.send("Conteúdo excluído!");
    }
}

module.exports = new clienteController();