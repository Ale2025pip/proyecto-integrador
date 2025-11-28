const express = require('express');
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productoController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin'); // ← NUEVO

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);

router.post('/', authMiddleware, adminMiddleware, createProducto);       // ← PROTEGIDO
router.put('/:id', authMiddleware, adminMiddleware, updateProducto);     // ← PROTEGIDO  
router.delete('/:id', authMiddleware, adminMiddleware, deleteProducto);  // ← PROTEGIDO

module.exports = router;