const clienteController = require('../controllers/clienteController');
const express = require('express');

const router = express.Router();

//Produtos
router.get('/', clienteController.getAll);
router.get('/:id', clienteController.get);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.delete);

module.exports = router;