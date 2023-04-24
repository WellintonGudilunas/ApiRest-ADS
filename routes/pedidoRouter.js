const pedidoController = require('../controllers/pedidoController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscarPorCodigo);
router.post('/', pedidoController.create);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.excluir);

module.exports = router;