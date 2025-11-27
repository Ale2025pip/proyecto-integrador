const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const productoRoutes = require('./routes/productos');
const compraRoutes = require('./routes/compras');
const pedidoRoutes = require('./routes/pedidos');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Backend funcionando!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'Connected'
  });
});

// Manejo de errores para producción
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Servidor corriendo en puerto ${PORT}`);
});