const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');
const produtoModel = require('../models/produtoModel');

class pedidoController {

    constructor() {
        // Inicializa a classe com as propriedades e métodos necessários
        this.buscarPorCodigo = this.buscarPorCodigo.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    async listar(req, res) {
        //select * from pedido;  
        const resultado = await pedidoModel.find({});

        if (!resultado || resultado.length === 0) {
            res.status(400).json({ msg: "Não há nenhum pedido cadastrado!." });
            return;
        }

        res.json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        //select * from pedido where codigo = 2;
        const resultado = await pedidoModel.findOne({ 'codigo': codigo });
        if (!resultado) {
            res.status(400).json({ msg: `Pedido com código ${codigo} não encontrado.` });
            return;
        }

        res.json(resultado);
        return resultado;
    }

    async cadastrar(req, res) {
        const pedido = req.body;

        if (pedido.produtos.length !== pedido.quantidade.length) {
            res.status(400).json({ msg: "Erro no tamanho dos vetores" });
            return;
        }

        //REFERENCIA 
        const cliente = await clienteModel.findOne({ 'codigo': pedido.codigoCliente })
        if (cliente === null) {
            res.status(400).json({ msg: `Cliente com código ${pedido.codigoCliente} não encontrado.` });
            return;
        }
        pedido.codigoCliente = cliente._id;
        pedido.codigoProduto = [];

        for (let i = 0; i < pedido.produtos.length; i++) {
            const cod = pedido.produtos[i];
            let p = await produtoModel.findOne({ 'codigo': cod });

            if (!p) {
                res.status(400).json({ msg: `O produto com código ${cod} é inexistente` });
                return;
            }

            pedido.codigoProduto[i] = p._id;
        }
        //Removendo o json produtos
        pedido.produtos = undefined;

        //Gerador de novo código
        //select * from pedido order by codigo desc;
        const objeto = await pedidoModel.findOne({}).sort({ 'codigo': -1 });
        pedido.codigo = objeto == null ? 1 : objeto.codigo + 1;

        //Esse aq é um testezinho pq no postman fica mais facil de ver
        //res.json(pedido);
        //return;

        try {
            const resultado = await pedidoModel.create(pedido);
            res.json(resultado);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }

    async atualizar(req, res) {
        try {
            const codigoPedido = req.params.codigo;
            const pedidoAtualizado = req.body;

            const pedido = await pedidoModel.findOne({ 'codigo': codigoPedido });
            if (pedido === null) {
                res.status(400).json({ msg: `Pedido com código ${codigoPedido} não encontrado.` });
                return;
            }

            //Procurando cliente
            const cliente = await clienteModel.findOne({ 'codigo': pedidoAtualizado.codigoCliente })
            if (cliente === null) {
                res.status(400).json({ msg: `Cliente com código ${pedidoAtualizado.codigoCliente} não encontrado.` });
                return;
            }

            pedido.codigoCliente = cliente._id;
            pedido.codigoProduto = [];

            for (let i = 0; i < pedidoAtualizado.produtos.length; i++) {
                const cod = pedidoAtualizado.produtos[i];
                let p = await produtoModel.findOne({ 'codigo': cod });
                if (!p) {
                    res.status(400).json({ msg: `O produto com código ${cod} é inexistente` });
                    return;
                }
                pedido.codigoProduto[i] = p._id;
            }
            //Removendo o json produtos
            pedido.produtos = undefined;
            pedido.quantidade = pedidoAtualizado.quantidade;

            await pedidoModel.findOneAndUpdate({ "codigo": codigoPedido }, pedido);

            //Retornar o pedido atualizado
            //const retorno = await pedidoModel.findOne({"codigo": codigoPedido});
            //console.log(retorno);
            //res.json(retorno);
            res.send("Conteúdo atualizado!");
        } catch (err) {
            res.status(500).json({msg:"Erro interno"});
        }
    }


    //REVISAR ISSO
    /*
    *
    */
    async excluir(req, res) {

        const dados = await pedidoModel.findOne({ 'codigo': req.params.codigo });

        if (dados === null) {
            res.status(400).send("Código não encontrado");
            return;
        }
        const codigo = req.params.codigo;

        const retorno = await pedidoModel.findOneAndDelete({ 'codigo': codigo });
        if (retorno == null) {
            res.send("Conteúdo não encontrado");
            return;
        }
        res.send("Conteúdo excluído!");
    }

}

module.exports = new pedidoController();