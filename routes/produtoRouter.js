const produtoController = require('../controllers/produtoController');
const express = require('express');

const router = express.Router();
const upload = require('../config/multer');

//Produtos
router.get('/', produtoController.getAll);
router.get('/:id', produtoController.get);
router.post('/', upload.single('imagem'), produtoController.create);
router.put('/:id', upload.single('imagem'), produtoController.update);
router.delete('/:id', produtoController.delete);

module.exports = router;