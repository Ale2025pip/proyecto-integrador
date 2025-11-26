const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 URI de MongoDB:', process.env.MONGODB_URI ? 'PRESENTE' : 'FALTANTE');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;