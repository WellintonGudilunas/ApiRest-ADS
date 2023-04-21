const clienteController = require('../controllers/clienteController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorCodigo);
router.post('/', clienteController.salvar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;