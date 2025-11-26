const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
// Importar rutas
const authRoutes = require('./routes/auth');
const productoRoutes = require('./routes/productos');
const compraRoutes = require('./routes/compras');

const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes); 
app.use('/api/compras', compraRoutes); 

// ruta de prueba
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor corriendo en puerto ${PORT}`);
});