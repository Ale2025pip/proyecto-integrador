import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalPrice 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center bg-white rounded-2xl shadow-sm p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Descubre productos increíbles y agrégalos a tu carrito
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-300"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tu Carrito de Compras</h1>
          <button 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Vaciar Carrito
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LISTA DE PRODUCTOS */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex gap-4">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.nombre}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.descripcion}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ${(item.precio * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${item.precio} c/u</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN DE COMPRA */}
          <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de Compra</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button 
                onClick={() => window.location.href = '/checkout'}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition duration-300 mb-4"
                >Finalizar Compra
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-300"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
