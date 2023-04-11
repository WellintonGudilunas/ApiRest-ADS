const pedidoController = require('../controllers/pedidoController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', pedidoController.listar);
router.get('/:codigo', pedidoController.buscarPorCodigo);
router.post('/', pedidoController.cadastrar);
router.put('/:codigo', pedidoController.atualizar);
router.delete('/:codigo', pedidoController.excluir);

module.exports = router;