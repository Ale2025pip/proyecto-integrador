const Compra = require('../models/Compra');
const Producto = require('../models/Producto');
const User = require('../models/User');

const getCompras = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const compras = await Compra.find({ usuario: req.user.id })
      .populate('usuario', 'email nombre apellido')
      .populate('productos.producto', 'nombre precio imagen')
      .sort({ fechaCompra: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Compra.countDocuments({ usuario: req.user.id });

    res.json({
      compras,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompraById = async (req, res) => {
  try {
    const compra = await Compra.findOne({ 
      _id: req.params.id, 
      usuario: req.user.id 
    })
    .populate('usuario', 'email nombre apellido telefono')
    .populate('productos.producto', 'nombre descripcion precio imagen');

    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCompra = async (req, res) => {
  try {
    const { 
      direccionEnvio, 
      productos, 
      metodoPago,
      actualizarPerfil // flag para saber si guardar datos en el perfil
    } = req.body;

    // Validar método de pago
    const metodosPagoValidos = ['tarjeta', 'transferencia', 'efectivo'];
    if (!metodoPago || !metodosPagoValidos.includes(metodoPago)) {
      return res.status(400).json({ 
        error: 'Método de pago inválido. Opciones: tarjeta, transferencia, efectivo' 
      });
    }

    // Calcular total y verificar productos
    let total = 0;
    const productosConPrecio = await Promise.all(
      productos.map(async (item) => {
        const producto = await Producto.findById(item.producto);
        if (!producto) {
          throw new Error(`Producto ${item.producto} no encontrado`);
        }
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para ${producto.nombre}`);
        }
        total += producto.precio * item.cantidad;
        return {
          producto: item.producto,
          cantidad: item.cantidad,
          precioUnitario: producto.precio
        };
      })
    );

    // ACTUALIZAR PERFIL DEL USUARIO si se solicita
    if (actualizarPerfil) {
      await User.findByIdAndUpdate(req.user.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        direccion: direccionEnvio,
        metodoPagoPreferido: metodoPago
      });
    }

    // CREAR LA COMPRA
    const compra = new Compra({
      direccionEnvio,
      total,
      usuario: req.user.id,
      productos: productosConPrecio,
      metodoPago,
      estado: 'pendiente'
    });

    await compra.save();
    
    // ACTUALIZAR STOCK de productos
    for (const item of productos) {
      await Producto.findByIdAndUpdate(
        item.producto,
        { $inc: { stock: -item.cantidad } }
      );
    }

    // Populate para respuesta
    await compra.populate('productos.producto', 'nombre precio');
    await compra.populate('usuario', 'email nombre');

    res.status(201).json({
      message: 'Compra creada exitosamente',
      compra: compra,
      numeroPedido: compra.numeroPedido
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCompras,
  getCompraById,
  createCompra
};
