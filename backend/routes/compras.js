const express = require('express');
const {
  getCompras,
  getCompraById,
  createCompra
} = require('../controllers/compraController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Todas las rutas protegidas
router.get('/', authMiddleware, getCompras);
router.get('/:id', authMiddleware, getCompraById);
router.post('/', authMiddleware, createCompra);

module.exports = router;
