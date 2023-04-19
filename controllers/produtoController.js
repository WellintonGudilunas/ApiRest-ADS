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
            const codigo = req.params.codigo;
            //select * from produto where codigo = 2;
            const produto = await produtoModel.findOne({ 'codigo': codigo });

            if (!produto || produto.length === 0) {
                res.status(400).json({ msg: `Produto com o código ${codigo} não encontrado.` });
                return;
            }

            res.json(produto);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async salvar(req, res) {
        try {
            const produto = req.body;

            //Gerador de novo código
            //select * from produto order by codigo desc;
            const objeto = await produtoModel.findOne({}).sort({ 'codigo': -1 });
            produto.codigo = objeto == null ? 1 : objeto.codigo + 1;

            if (req.file === undefined) {
                console.log(req);
                res.status(400).send({ msg: "Erro no upload do arquivo" });
                return;
            }

            produto.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };

            //insert into produto (xxx) values (xxxx);
            const resultado = await produtoModel.create(produto);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo;
            const produto = req.body;
            //update produto set xxxx values xxxx
            await produtoModel.findOneAndUpdate({ 'codigo': codigo }, produto);
            res.send("Conteúdo atualizado!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async excluir(req, res) {
        try {
            const codigo = req.params.codigo;
            const retorno = await produtoModel.findOneAndDelete({ 'codigo': codigo });

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