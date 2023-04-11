const produtoModel = require('../models/produtoModel');

class produtoController{

    async listar(req, res){  
        //select * from produto;  
        const resultado = await produtoModel.find({});
        res.json(resultado);    
    }

    async buscarPorCodigo(req, res){
        const codigo  = req.params.codigo;
        //select * from produto where codigo = 2;
        const resultado = await produtoModel.findOne({'codigo': codigo});
        res.json(resultado);
    }

    async salvar(req, res){
        const produto = req.body;

        //Gerador de novo código
        //select * from produto order by codigo desc;
        const objeto = await produtoModel.findOne({}).sort({'codigo': -1});
        produto.codigo = objeto == null ? 1 : objeto.codigo + 1;

        //insert into produto (xxx) values (xxxx);
        const resultado = await produtoModel.create(produto);
        res.json(resultado);        
    }

    async atualizar(req, res){
        const codigo = req.params.codigo;
        const produto = req.body;
        //update produto set xxxx values xxxx
        await produtoModel.findOneAndUpdate({'codigo': codigo}, produto);
        res.send("Conteúdo atualizado!");
    }

    async excluir(req, res){
        const codigo = req.params.codigo;
        await produtoModel.findOneAndDelete({'codigo': codigo});
        res.send("Conteúdo excluído!");
    }
}

module.exports = new produtoController();