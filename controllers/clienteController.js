const clienteModel = require('../models/clienteModel');

class clienteController {

    async getAll(req, res) {
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

    async get(req, res) {
        try {
            const id = req.params.id;
            //select * from cliente where codigo = 2;
            const cliente = await clienteModel.findById(id);
            if (!cliente) {
                res.status(400).json({ msg: "Cliente não encontrado." });
                return;
            }
            res.json(cliente);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async create(req, res) {
        
        try {
            const cliente = {
                nome: req.body.nome,
                idade: req.body.idade,
                cep: req.body.cep
            }
            
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
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
        
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const cliente = {
                nome: req.body.nome,
                idade: req.body.idade,
                cep: req.body.cep
            }
            //update cliente set xxxx values xxxx
            const updatedCliente = await clienteModel.findByIdAndUpdate(id, cliente);
            if (!updatedCliente) {
                res.status(400).json({ msg: "Cliente não encontrado!." });
                return;
            }
            res.json({ updatedCliente, msg: "Cliente Atualizado com sucesso!" });
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const cliente = await clienteModel.findByIdAndDelete(id);
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