const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
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
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado'],
    default: 'pendiente'
  },
  direccionEnvio: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);
