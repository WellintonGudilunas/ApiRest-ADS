const pedidoModel = require('../models/pedidoModel');

class pedidoController{

    constructor() {
        // Inicializa a classe com as propriedades e métodos necessários
        this.buscarPorCodigo = this.buscarPorCodigo.bind(this);
        this.excluir = this.excluir.bind(this);
      }

    async listar(req, res){  
        //select * from pedido;  
        const resultado = await pedidoModel.find({});
        res.json(resultado);    
    }

    async buscarPorCodigo(req, res){
        const codigo  = req.params.codigo;
        //select * from pedido where codigo = 2;
        const resultado = await pedidoModel.findOne({'codigo': codigo});
        res.json(resultado);
        return resultado;
    }

    async cadastrar(req, res){
        const pedido = req.body;
        if(pedido.codigoProduto.length !== pedido.quantidade.length){
            res.status(400).send("Erro no tamanho dos vetores");
            return;
        }
        //Gerador de novo código
        //select * from pedido order by codigo desc;
        const objeto = await pedidoModel.findOne({}).sort({'codigo': -1});
        pedido.codigo = objeto == null ? 1 : objeto.codigo + 1;

        //insert into pedido (xxx) values (xxxx);
        const resultado = await pedidoModel.create(pedido);
        res.json(resultado);
    }

    async atualizar(req, res){
        const codigo = req.params.codigo;
        const pedido = req.body;
        //update pedido set xxxx values xxxx
        await pedidoModel.findOneAndUpdate({'codigo': codigo}, pedido);
        res.send("Conteúdo atualizado!");
    }

    async excluir(req, res){
        const dados = await this.buscarPorCodigo(req, res).catch(error => {
            console.log(error);
            res.status(500).send("Erro ao excluir conteúdo!");
        });
    
        if(dados === null){
            res.status(400).send("Código não encontrado");
            return;
        }
        const codigo = req.params.codigo;
        
        await pedidoModel.findOneAndDelete({'codigo': codigo});
        res.send("Conteúdo excluído!");
    }
    
}

module.exports = new pedidoController();