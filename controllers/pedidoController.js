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
        try {
            //select * from pedido;  
            const resultado = await pedidoModel.find({});

            if (!resultado || resultado.length === 0) {
                res.status(400).json({ msg: "Não há nenhum pedido cadastrado!." });
                return;
            }

            res.json(resultado);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async buscarPorCodigo(req, res) {
        try {
            const codigo = req.params.codigo;
            //select * from pedido where codigo = 2;
            const resultado = await pedidoModel.findOne({ 'codigo': codigo });
            if (!resultado) {
                res.status(400).json({ msg: `Pedido com código ${codigo} não encontrado.` });
                return;
            }

            res.json(resultado);
            return resultado;
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async cadastrar(req, res) {
        try {
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
            let valorTotal = 0;
            for (let i = 0; i < pedido.produtos.length; i++) {
                const cod = pedido.produtos[i];
                let p = await produtoModel.findOne({ 'codigo': cod });
                if (!p) {
                    res.status(400).json({ msg: `O produto com código ${cod} é inexistente` });
                    return;
                }
                valorTotal += p.preco * pedido.quantidade[i];
                pedido.codigoProduto[i] = p._id;
            }
            pedido.valorTotal = valorTotal;
            //Removendo o json produtos
            pedido.produtos = undefined;

            //Gerador de novo código
            //select * from pedido order by codigo desc;
            const objeto = await pedidoModel.findOne({}).sort({ 'codigo': -1 });
            pedido.codigo = objeto == null ? 1 : objeto.codigo + 1;

            //Esse aq é um testezinho pq no postman fica mais facil de ver
            //res.json(pedido);
            //return;
            const resultado = await pedidoModel.create(pedido);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async atualizar(req, res) {
        try {
            const codigoPedido = req.params.codigo;
            const pedidoAtualizado = req.body;
            if (pedidoAtualizado.produtos.length !== pedidoAtualizado.quantidade.length) {
                res.status(400).json({ msg: "Erro no tamanho dos vetores" });
                return;
            }

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
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async excluir(req, res) {
        try {
            const codigo = req.params.codigo;

            let retorno = await pedidoModel.findOneAndDelete({ 'codigo': codigo });
            if (retorno === null) {
                res.status(400).json({ msg: `O pedido com código ${codigo} é inexistente` });
                return;
            }
            retorno = await pedidoModel.findOne({ 'codigo': codigo });
            if (retorno != null) {
                res.status(400).json({ msg: `O pedido com código ${codigo} não foi excluid com exito` });
                return;
            }
            res.send("Conteúdo excluído!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

}

module.exports = new pedidoController();