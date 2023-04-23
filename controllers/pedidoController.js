const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');
const produtoModel = require('../models/produtoModel');
const itemPedidoModel = require('../models/itemPedidoModel');

class pedidoController {
    /*
        constructor() {
            // Inicializa a classe com as propriedades e métodos necessários
            this.buscarPorCodigo = this.buscarPorCodigo.bind(this);
            this.excluir = this.excluir.bind(this);
        }
    */
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
            const id = req.params.id;
            //select * from pedido where codigo = 2;
            const resultado = await pedidoModel.findById(id);
            if (!resultado) {
                res.status(400).json({ msg: `Pedido com id ${id} não encontrado.` });
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
            const cliente = await clienteModel.findById(pedido.idCliente);
            if (cliente === null) {
                res.status(400).json({ msg: `Cliente com id ${pedido.idCliente} não encontrado.` });
                return;
            }

            pedido.idCliente = cliente._id;
            pedido.idProduto = [];
            pedido.valorTotal = 0;
            pedido.idItensPedido = [];
            for (let i = 0; i < pedido.produtos.length; i++) {
                const idProduto = pedido.produtos[i];
                let p = await produtoModel.findById(idProduto);
                if (!p) {
                    res.status(400).json({ msg: `O produto com id ${idProduto} é inexistente` });
                    return;
                }
                let item = {
                    idProduto : p._id,
                    quantidade: pedido.quantidade[i],
                }
                const itemPedido = await itemPedidoModel.create(item);
                pedido.idItensPedido[i] = itemPedido._id;
                pedido.valorTotal += p.preco * pedido.quantidade[i];
                console.log(item);
            }
            
            //Removendo o json produtos
            pedido.produtos = undefined;
            pedido.quantidade = undefined;

            const resultado = await pedidoModel.create(pedido);
            res.json(resultado);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async atualizar(req, res) {
        try {
            const idPedido = req.params.id;
            const pedidoAtualizado = req.body;
            if (pedidoAtualizado.produtos.length !== pedidoAtualizado.quantidade.length) {
                res.status(400).json({ msg: "Erro no tamanho dos vetores" });
                return;
            }

            const pedido = await pedidoModel.findById(idPedido);
            if (pedido === null) {
                res.status(400).json({ msg: `Pedido com id ${idPedido} não encontrado.` });
                return;
            }

            //Procurando cliente
            const cliente = await clienteModel.findById(pedidoAtualizado.idCliente);
            if (cliente === null) {
                res.status(400).json({ msg: `Cliente com id ${pedidoAtualizado.idCliente} não encontrado.` });
                return;
            }
            pedido.idCliente = cliente.id;
            pedido.idProduto = [];
            pedido.valorTotal = 0;
            pedido.itensPedidos = [];

            for (let i = 0; i < pedidoAtualizado.quantidade.length; i++) {
                const idProduto = pedidoAtualizado.produtos[i];
                let p = await produtoModel.findById(idProduto);
                if (!p) {
                    res.status(400).json({msg: `O produto com id ${idProduto} é inexistente`});
                    return;
                }
                let item = {
                    idProduto : p._id,
                    quantidade : pedidoAtualizado.quantidade[i]
                }
                pedido.itensPedidos[i] = item;
                pedido.valorTotal += p.preco * pedidoAtualizado.quantidade[i];
            }
            //Removendo o json produtos
            pedido.produtos = undefined;
            pedido.quantidade = undefined;
            
            await pedidoModel.findByIdAndUpdate(idPedido, pedido);

            res.send("Conteúdo atualizado!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;

            let retorno = await pedidoModel.findByIdAndDelete(id);
            if (retorno === null) {
                res.status(400).json({ msg: `O pedido com id ${id} é inexistente` });
                return;
            }
            retorno = await pedidoModel.findById(id);
            if (retorno != null) {
                res.status(400).json({ msg: `O pedido com id ${id} não foi excluid com exito` });
                return;
            }
            res.send("Conteúdo excluído!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

}

module.exports = new pedidoController();