const produtoController = require('../controllers/produtoController');
const express = require('express');

const router = express.Router();
const upload = require('../config/multer');

//Produtos
router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorCodigo);
router.post('/', upload.single('imagem'), produtoController.salvar);
router.put('/:id', upload.single('imagem'), produtoController.atualizar);
router.delete('/:id', produtoController.excluir);

module.exports = router;