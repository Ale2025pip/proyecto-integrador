const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // NUEVOS CAMPOS PARA EL PERFIL
  nombre: {
    type: String,
    trim: true
  },
  apellido: {
    type: String,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  direccion: {
    calle: {
      type: String,
      trim: true
    },
    ciudad: {
      type: String,
      trim: true
    },
    codigoPostal: {
      type: String,
      trim: true
    },
    pais: {
      type: String,
      trim: true,
      default: 'Argentina'
    }
  },
  metodoPagoPreferido: {
    type: String,
    enum: ['tarjeta', 'transferencia', 'efectivo', null],
    default: null
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método útil para verificar si el usuario tiene perfil completo
userSchema.methods.tienePerfilCompleto = function() {
  return !!(this.nombre && this.apellido && this.telefono && this.direccion.calle);
};

module.exports = mongoose.model('User', userSchema);