function MisPedidos() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-6xl mb-6">📦</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Seguir Comprando
          </button>
          <button 
            onClick={() => window.location.href = '/cart'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Ver Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default MisPedidos;
