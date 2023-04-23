const produtoModel = require('../models/produtoModel');


class produtoController {

    async listar(req, res) {
        try {
            //select * from produto;  
            const produto = await produtoModel.find({});

            if (!produto || produto.length === 0) {
                res.status(400).json({ msg: "Não há nenhum produto cadastrado!." });
                return;
            }
            res.json(produto);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async buscarPorCodigo(req, res) {
        try {
            const id = req.params.id;
            //select * from produto where codigo = 2;
            const produto = await produtoModel.findById(id);

            if (!produto || produto.length === 0) {
                res.status(400).json({ msg: `Produto com o id ${id} não encontrado.` });
                return;
            }
            produto.img = undefined;
            res.json(produto);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async salvar(req, res) {
        try {
            const produto = req.body;

            /*if (req.file === undefined) {
                console.log(req);
                res.status(400).send({ msg: "Erro no upload do arquivo" });
                return;
            }

            produto.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };*/

            const resultado = await produtoModel.create(produto);
            res.json("Conteúdo adicionado");
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const produto = req.body;

            if (!(req.file === undefined)) {
                produto.img = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }

            //update produto set xxxx values xxxx
            await produtoModel.findByIdAndUpdate(id, produto);
            res.send("Conteúdo atualizado!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const retorno = await produtoModel.findByIdAndDelete(id);

            if (retorno == null) {
                res.status(400).json({ msg: "Conteúdo não encontrado" });
                return;
            }
            res.send("Conteúdo excluído!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }
}

module.exports = new produtoController();