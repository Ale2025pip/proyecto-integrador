import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm({ type, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('❌ Completa todos los campos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Llamar a onSubmit y ESPERAR la respuesta
      const result = await onSubmit(email, password);
      
      if (result && result.success) {
        setMessage(`✅ ${type === 'login' ? 'Login' : 'Registro'} exitoso!`);
        // Redirigir después de 1.5 segundos
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(`❌ ${result?.error || 'Error desconocido'}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
      </h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded-md text-center ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition duration-200"
        >
          {loading ? 'Cargando...' : (type === 'login' ? 'Login' : 'Registrarse')}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;