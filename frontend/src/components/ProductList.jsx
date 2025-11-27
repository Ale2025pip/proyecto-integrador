import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const { addToCart } = useCart();

  // Productos de ejemplo - visibles para TODOS
  const demoProducts = [
    {
      _id: '1',
      nombre: 'Laptop Gamer HP',
      descripcion: 'Laptop para gaming, 16GB RAM, SSD 512GB, NVIDIA RTX 3060, pantalla 15.6" FHD 144Hz',
      precio: 1500000,
      imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
      categoria: 'Tecnología',
      stock: 10
    },
    {
      _id: '2', 
      nombre: 'iPhone 15 Pro',
      descripcion: '128GB, cámara triple 48MP, pantalla Super Retina XDR, chip A17 Pro, resistencia al agua IP68',
      precio: 1800000,
      imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
      categoria: 'Celulares',
      stock: 15
    },
    {
      _id: '3',
      nombre: 'Auriculares Sony WH-1000XM4',
      descripcion: 'Cancelación de ruido activa, batería 30h, Bluetooth 5.0, asistente de voz, sonido Hi-Res',
      precio: 70000,
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      categoria: 'Audio',
      stock: 8
    }
  ];
  const handleAddToCart = (product) => {
    addToCart(product);
    // Opcional: mostrar notificación o mensaje
    alert(`✅ ${product.nombre} agregado al carrito!`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setProducts(demoProducts);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* PRESENTACIÓN */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🛍️ Bienvenido a TechStore</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubre la mejor tecnología al precio más competitivo. 
          {!isAuthenticated && " Regístrate para comprar y recibir ofertas exclusivas."}
        </p>
      </div>

      {/* CARTEL ADMIN */}
      {isAdmin && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-800 font-semibold">
            ⚙️ <strong>Modo Administrador Activado</strong> - Puedes gestionar el catálogo de productos
          </p>
        </div>
      )}

      {/* BOTÓN CREAR PRODUCTO (SOLO ADMIN) */}
      {isAdmin && (
        <div className="text-center mb-8">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300">
            ➕ Crear Nuevo Producto
          </button>
        </div>
      )}

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <img 
              src={product.imagen} 
              alt={product.nombre}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">{product.nombre}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  {product.categoria}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.descripcion}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">${product.precio}</span>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              
              {/* BOTONES PRINCIPALES */}
              <div className="flex gap-3 mb-3">
                <button 
                    onClick={() => handleViewDetails(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                >
                    👁️ Ver Detalles
                </button>
                <button 
                    onClick={() => isAuthenticated ? handleAddToCart(product) : (window.location.href = '/login')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                >
                    🛒 {isAuthenticated ? 'Agregar al Carrito' : 'Comprar'}
                </button>
            </div>

              {/* BOTONES ADMIN (SOLO SI ES ADMIN) */}
              {isAdmin && (
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium">
                    ✏️ Editar
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium">
                    🗑️ Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MENSAJE PARA NO LOGUEADOS */}
      {!isAuthenticated && (
        <div className="text-center mt-12 p-8 bg-blue-300 to-green-50 rounded-2xl border">
          <p className="text-gray-700 text-lg mb-4">
            🔓 <strong>¿Quieres comprar?</strong> Regístrate gratis en 30 segundos
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => window.location.href = '/register'}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      )}
    {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductList;
