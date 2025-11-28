const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  fechaCompra: {
    type: Date,
    default: Date.now
  },
  // MEJORADO: Dirección estructurada (igual que en User)
  direccionEnvio: {
    calle: {
      type: String,
      required: true,
      trim: true
    },
    ciudad: {
      type: String,
      required: true,
      trim: true
    },
    codigoPostal: {
      type: String,
      required: true,
      trim: true
    },
    pais: {
      type: String,
      default: 'Argentina',
      trim: true
    }
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  // NUEVOS CAMPOS
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  metodoPago: {
    type: String,
    enum: ['tarjeta', 'transferencia', 'efectivo'],
    required: true
  },
  numeroPedido: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generar número de pedido automáticamente antes de guardar
compraSchema.pre('save', async function(next) {
  if (!this.numeroPedido) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.numeroPedido = `PED-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Compra', compraSchema);