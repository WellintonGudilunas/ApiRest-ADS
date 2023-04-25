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
    async getAll(req, res) {
        try {
            //select * from pedido;  
            const resultado = await pedidoModel.find({});

            if (!resultado || resultado.length === 0) {
                res.status(400).json({ msg: "Não há nenhum pedido cadastrado!." });
                return;
            }
            console.log(resultado);

            for(let i = 0; i < resultado.length; i++){
                console.log(resultado[i].idItensPedido)
                if(!resultado[i].idItensPedido){
                    throw "Erro";
                }
                const itensPedidos = await itemPedidoModel.findById(resultado[i].idItensPedido);
                
                resultado[i].idItensPedido = itensPedidos;
            }

            res.json(resultado);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async get(req, res) {
        try {
            const id = req.params.id;
            //select * from pedido where codigo = 2;
            const resultado = await pedidoModel.findById(id);
            if (!resultado) {
                res.status(400).json({ msg: `Pedido com id ${id} não encontrado.` });
                return;
            }
            if(!resultado.idItensPedido){
                throw "Erro";
            }
            const itensPedidos = await itemPedidoModel.findById(resultado.idItensPedido);
            
            resultado.idItensPedido = itensPedidos;
            res.json(resultado);
            return resultado;
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async create(req, res) {
        try {
            const pedido = req.body;

            /*if (pedido.produtos.length !== pedido.quantidade.length) {
                res.status(400).json({ msg: "Erro no tamanho dos vetores" });
                return;
            }*/

            //REFERENCIA
            const cliente = await clienteModel.findById(pedido.idCliente);
            if (cliente === null) {
                res.status(400).json({ msg: `Cliente com id ${pedido.idCliente} não encontrado.` });
                return;
            }

            pedido.idCliente = cliente;
            pedido.idProduto = [];
            pedido.valorTotal = 0;
            let items = [];
            for (let i = 0; i < pedido.produtos.length; i++) {
                const idProduto = pedido.produtos[i].idProduto;
                let p = await produtoModel.findById(idProduto);
                
                if (!p) {
                    res.status(400).json({ msg: `O produto com id ${idProduto} é inexistente` });
                    return;
                }

                if(pedido.produtos[i].quantidade ==0) {
                    pedido.produtos[i] = undefined;
                    continue;
                }

                if(p.estoque < pedido.produtos[i].quantidade){
                    let mensagemRetorno ;
                    if(p.estoque > 1){
                        mensagemRetorno = `O produto com id ${idProduto} só tem ${p.estoque} unidades disponíveis`;
                    } else if (p.estoque === 1){
                        mensagemRetorno = `O produto com id ${idProduto} só tem uma unidade disponível`;
                    } else {
                        mensagemRetorno = `O produto com id ${idProduto} não está disponível`;
                    }
                    res.status(400).json({ msg: mensagemRetorno });
                    return;
                }
                
                const quantidadeDiminuir = {
                    estoque: (p.estoque - pedido.produtos[i].quantidade)
                }
                await produtoModel.findByIdAndUpdate(idProduto, quantidadeDiminuir);
                items[i] = {
                    idProduto : p._id,
                    quantidade: pedido.produtos[i].quantidade,
                }
                
                pedido.valorTotal += p.preco * pedido.produtos[i].quantidade;
            }
            
            let itemPedidoObj = {
                coisasCompradas: items
            }
            //console.log(itemPedidoObj)
            const itemPedido = await itemPedidoModel.create(itemPedidoObj);
            //pedido.idItensPedido = itemPedido.teste;
            pedido.idItensPedido = itemPedido;
            if(pedido.idItensPedido.coisasCompradas.length == 0){
                res.status(400).json({ msg: "Você não pode fazer um pedido sem nenhum produto!!" });
                return;
                
            }
            //Removendo o json produtos
            //pedido.produtos = undefined;
            //pedido.quantidade = undefined;

            const resultado = await pedidoModel.create(pedido);
            res.json(resultado);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async update(req, res) {
        try {
            const idPedido = req.params.id;
            const pedidoAtualizado = req.body;
            /*
            if (pedidoAtualizado.produtos.length !== pedidoAtualizado.quantidade.length) {
                res.status(400).json({ msg: "Erro no tamanho dos vetores" });
                return;
            }
            */

            //Procurando pedido
            const pedido = await pedidoModel.findById(idPedido);
            if (!pedido) {
                res.status(400).json({ msg: `Pedido com id ${idPedido} não encontrado.` });
                return;
            }

            //Procurando cliente
            const cliente = await clienteModel.findById(pedidoAtualizado.idCliente);
            if (!cliente) {
                res.status(400).json({ msg: `Cliente com id ${pedidoAtualizado.idCliente} não encontrado.` });
                return;
            }

            pedido.idCliente = cliente;
            pedido.idProduto = [];
            pedidoAtualizado.valorTotal = 0;
            let items = [];
            for (let i = 0; i < pedidoAtualizado.produtos.length; i++) {
                const idProduto = pedidoAtualizado.produtos[i].idProduto;
                let p = await produtoModel.findById(idProduto);

                if (!p) {
                    res.status(400).json({msg: `O produto com id ${idProduto} é inexistente`});
                    return;
                }
                
                items[i] = {
                    idProduto : p,
                    quantidade: pedidoAtualizado.produtos[i].quantidade,
                }

                pedidoAtualizado.valorTotal += p.preco * pedidoAtualizado.produtos[i].quantidade;
            }
            let itemPedidoObj = {
                coisasCompradas: items
            }
            const itemPedidoAtualizado = await itemPedidoModel.findByIdAndUpdate(pedido.idItensPedido, itemPedidoObj);
            pedidoAtualizado.idItensPedido = itemPedidoAtualizado;
            //Removendo o json produtos
            // pedido.produtos = undefined;
            // pedido.quantidade = undefined;
            
            await pedidoModel.findByIdAndUpdate(idPedido, pedidoAtualizado);

            res.send("Conteúdo atualizado!");
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async delete(req, res) {
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