const clienteModel = require('../models/clienteModel');

class clienteController{

    async listar(req, res){  
        //select * from cliente;  
        const resultado = await clienteModel.find({});

        if(!resultado || resultado.length === 0){
            res.status(404).json({msg: "Não há nenhum cliente cadastrado!."});
            return;
        }

        res.json(resultado);    
    }

    async buscarPorCodigo(req, res){
        const codigo  = req.params.codigo;
        //select * from cliente where codigo = 2;
        const resultado = await clienteModel.findOne({'codigo': codigo});
        if(!resultado){
            res.status(404).json({msg: "Cliente não encontrado."});
            return;
        }

        res.json(resultado);
    }


    // FAZER VALIDAÇÃO SE ESTÁ FALTANDO ALGUM CAMPO
    async salvar(req, res){
        const cliente = {
            nome: req.body.nome,
            idade: req.body.idade,
            cep: req.body.cep
        }
        
        //Gerador de novo código
        //select * from cliente order by codigo desc;
        const objeto = await clienteModel.findOne({}).sort({'codigo': -1});
        cliente.codigo = objeto == null ? 1 : objeto.codigo + 1;

        //insert into cliente (xxx) values (xxxx);
        const resultado = await clienteModel.create(cliente);
        res.json(resultado);        
    }


    // FAZER VALIDACAO SE ATUALIZOU ALGUMA COISA
    // FAZER VALIDACAO SE O CONTEUDO A SER ATUALIZADO EXISTE
    async atualizar(req, res){
        const codigo = req.params.codigo;
        const cliente = {
            nome: req.body.nome,
            idade: req.body.idade,
            cep: req.body.cep
        }
        
        //update cliente set xxxx values xxxx
        const updatedCliente = await clienteModel.findOneAndUpdate({'codigo': codigo}, cliente);
        if(!updatedCliente){
            res.status(404).json({msg: "Cliente não encontrado!."});
            return;
        }

        //VALIDAR SE ALGUM DADO FOI ATUALIZADO OU SE FALTA ALGUM CAMPO A ATUALIZAR
        // console.log(updatedCliente);
        // if (updatedCliente === null) {
        //     console.log('Nenhum documento foi atualizado.');
        //     res.status(200).json({cliente, msg: "Nenhum documento foi atualizado. (Os dados informados são exatamente iguais aos do cliente!)." });
        // } else {
        //     console.log('Documento(s) atualizado(s):', updatedCliente.nModified);
        //     res.status(200).json({cliente, msg: "Cliente Atualizado com sucesso!" });
        // }

    }

    async excluir(req, res){
        const codigo = req.params.codigo;
        const retorno = await clienteModel.findOneAndDelete({'codigo': codigo});
        if(retorno == null){
            res.send("Conteúdo não encontrado");
            return;
        }
        res.send("Conteúdo excluído!");
    }
}

module.exports = new clienteController();