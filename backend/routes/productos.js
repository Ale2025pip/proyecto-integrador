const express = require('express');
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Todas las rutas protegidas con authMiddleware
router.get('/', authMiddleware, getProductos);
router.get('/:id', authMiddleware, getProductoById);
router.post('/', authMiddleware, createProducto);
router.put('/:id', authMiddleware, updateProducto);
router.delete('/:id', authMiddleware, deleteProducto);

module.exports = router;
