const clienteController = require('../controllers/clienteController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.post('/', clienteController.salvar);
router.put('/:codigo', clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);

module.exports = router;