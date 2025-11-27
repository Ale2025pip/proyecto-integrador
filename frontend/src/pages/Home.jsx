import { useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [refreshProducts, setRefreshProducts] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === 'admin'; // ← NUEVO

  const handleProductCreated = () => {
    setRefreshProducts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="max-w-6xl mx-auto py-8">
        
        {/* SOLO ADMINS VEN EL FORMULARIO */}
        {isAdmin && (
          <div className="mb-8">
            <ProductForm onProductCreated={handleProductCreated} />
          </div>
        )}

        <ProductList key={refreshProducts} />
      </div>
    </div>
  );
}

export default Home;