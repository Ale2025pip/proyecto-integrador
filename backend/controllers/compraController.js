const Compra = require('../models/Compra');
const Producto = require('../models/Producto');

const getCompras = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const compras = await Compra.find({ usuario: req.user.id })
      .populate('usuario', 'email')
      .populate('productos.producto', 'nombre precio')
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
    .populate('usuario', 'email')
    .populate('productos.producto', 'nombre descripcion precio');

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
    const { direccion, productos } = req.body;

    // Calcular total
    let total = 0;
    const productosConPrecio = await Promise.all(
      productos.map(async (item) => {
        const producto = await Producto.findById(item.producto);
        if (!producto) {
          throw new Error(`Producto ${item.producto} no encontrado`);
        }
        total += producto.precio * item.cantidad;
        return {
          producto: item.producto,
          cantidad: item.cantidad,
          precioUnitario: producto.precio
        };
      })
    );

    const compra = new Compra({
      direccion,
      total,
      usuario: req.user.id,
      productos: productosConPrecio
    });

    await compra.save();
    await compra.populate('productos.producto', 'nombre precio');

    res.status(201).json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCompras,
  getCompraById,
  createCompra
};
