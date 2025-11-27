function Hero() {
  return (
    <div className="bg-green-600 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a Nuestra Tienda
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Descubre productos increíbles a los mejores precios
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-green-600 hover:bg-green-100 px-6 py-3 rounded-lg font-semibold transition duration-300">
            Ver Productos
          </button>
          <button className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition duration-300">
            Ofertas Especiales
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
