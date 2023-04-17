const produtoController = require('../controllers/produtoController');
const express = require('express');

const router = express.Router();
const upload = require('../config/multer');

//Produtos
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorCodigo);
//Desabilitado o envio de imagens por enquanto
//router.post('/', upload.single('image'), produtoController.salvar);
router.post('/', produtoController.salvar);
router.put('/:codigo', produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);

module.exports = router;