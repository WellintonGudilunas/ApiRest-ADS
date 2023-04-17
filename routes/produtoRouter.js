const produtoController = require('../controllers/produtoController');
const express = require('express');

const router = express.Router();
const upload = require('../config/multer');

//Produtos
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorCodigo);
router.post('/', upload.single('imagem'), produtoController.salvar);
router.put('/:codigo', produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);

module.exports = router;