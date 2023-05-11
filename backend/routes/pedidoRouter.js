const pedidoController = require('../controllers/pedidoController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', pedidoController.getAll);
router.get('/:id', pedidoController.get);
router.post('/', pedidoController.create);
router.put('/:id', pedidoController.update);
router.delete('/:id', pedidoController.delete);

module.exports = router;