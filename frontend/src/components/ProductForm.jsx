import { useState } from 'react';
import { productService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProductForm({ onProductCreated }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      setMessage('❌ Completa todos los campos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio)
      };

      const result = await productService.createProduct(productData, token);
      
      if (result._id) {
        setMessage('✅ Producto creado exitosamente!');
        setFormData({ nombre: '', descripcion: '', precio: '' });
        if (onProductCreated) {
          onProductCreated(); // Recargar la lista de productos
        }
      } else {
        setMessage(`❌ Error: ${result.error || 'No se pudo crear el producto'}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Crear Producto</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded-md ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input 
            type="text" 
            name="nombre"
            placeholder="Nombre del producto"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea 
            name="descripcion"
            placeholder="Descripción del producto"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Precio</label>
          <input 
            type="number" 
            name="precio"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition duration-200"
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;