const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        nombre: user.nombre,           // 🆕 NUEVO
        apellido: user.apellido,       // 🆕 NUEVO  
        telefono: user.telefono,       // 🆕 NUEVO
        direccion: user.direccion,     // 🆕 NUEVO
        metodoPagoPreferido: user.metodoPagoPreferido // 🆕 NUEVO
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login exitoso.',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        nombre: user.nombre,           // 🆕 NUEVO
        apellido: user.apellido,       // 🆕 NUEVO  
        telefono: user.telefono,       // 🆕 NUEVO
        direccion: user.direccion,     // 🆕 NUEVO
        metodoPagoPreferido: user.metodoPagoPreferido // 🆕 NUEVO
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion, metodoPagoPreferido } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar campos
    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (telefono) user.telefono = telefono;
    if (direccion) user.direccion = direccion;
    if (metodoPagoPreferido) user.metodoPagoPreferido = metodoPagoPreferido;

    await user.save();

    res.json({
      message: 'Perfil actualizado exitosamente',
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        direccion: user.direccion,
        metodoPagoPreferido: user.metodoPagoPreferido,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, updateProfile };
