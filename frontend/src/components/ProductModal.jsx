import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product);
    alert(`✅ ${product.nombre} agregado al carrito!`);
    onClose();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    addToCart(product);
    window.location.href = '/cart';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* IMAGEN */}
            <div>
              <img 
                src={product.imagen} 
                alt={product.nombre}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            
            {/* INFORMACIÓN */}
            <div className="space-y-4">
              <div>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.categoria}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-3">{product.nombre}</h2>
                <p className="text-2xl font-bold text-green-600 mt-2">${product.precio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Stock disponible:</span>
                  <p className="text-gray-600">{product.stock} unidades</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Envío:</span>
                  <p className="text-gray-600">Gratis a todo el país</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
                >
                  🛒 Agregar al Carrito
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
