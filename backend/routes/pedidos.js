const express = require('express');
const Pedido = require('../models/Pedido');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Crear pedido
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productos, direccionEnvio, total } = req.body;
    
    const pedido = new Pedido({
      usuario: req.user.id,
      productos,
      total,
      direccionEnvio
    });

    await pedido.save();
    await pedido.populate('productos.producto', 'nombre imagen');
    
    res.status(201).json({
      message: 'Pedido creado exitosamente',
      pedido
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener pedidos del usuario
router.get('/mis-pedidos', authMiddleware, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.user.id })
      .populate('productos.producto', 'nombre imagen precio')
      .sort({ createdAt: -1 });
    
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido específico
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const pedido = await Pedido.findOne({ 
      _id: req.params.id, 
      usuario: req.user.id 
    }).populate('productos.producto', 'nombre imagen precio');
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
