const clienteModel = require('../models/clienteModel');

class clienteController {

    async listar(req, res) {
        try {
            //select * from cliente;  
            const cliente = await clienteModel.find({});

            if (!cliente || cliente.length === 0) {
                res.status(400).json({ msg: "Não há nenhum cliente cadastrado!." });
                return;
            }

            res.json(cliente);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async buscarPorCodigo(req, res) {
        try {
            const codigo = req.params.codigo;
            //select * from cliente where codigo = 2;
            const cliente = await clienteModel.findOne({ 'codigo': codigo });
            if (!cliente) {
                res.status(400).json({ msg: "Cliente não encontrado." });
                return;
            }
            res.json(cliente);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async salvar(req, res) {
        try {
            const cliente = {
                nome: req.body.nome,
                idade: req.body.idade,
                cep: req.body.cep
            }
            //Gerador de novo código
            //select * from cliente order by codigo desc;
            const objeto = await clienteModel.findOne({}).sort({ 'codigo': -1 });
            cliente.codigo = objeto == null ? 1 : objeto.codigo + 1;

            //insert into cliente (xxx) values (xxxx);
            try {
                const resultado = await clienteModel.create(cliente);
                res.json(resultado);
            } catch (err) {
                if (err.name == "ValidationError") {
                    res.status(400).json({ msg: err.message });
                } else {
                    throw err;
                }
            }
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo;
            const cliente = {
                nome: req.body.nome,
                idade: req.body.idade,
                cep: req.body.cep
            }
            //update cliente set xxxx values xxxx
            const updatedCliente = await clienteModel.findOneAndUpdate({ 'codigo': codigo }, cliente);
            if (!updatedCliente) {
                res.status(400).json({ msg: "Cliente não encontrado!." });
                return;
            }
            res.json({ cliente, msg: "Cliente Atualizado com sucesso!" });
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async excluir(req, res) {
        try {
            const codigo = req.params.codigo;
            const cliente = await clienteModel.findOneAndDelete({ 'codigo': codigo });

            if (!cliente) {
                res.status(400).json({ msg: "Cliente não encontrado!." });
                return;
            }
            res.send("Conteúdo excluído!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }
}

module.exports = new clienteController();