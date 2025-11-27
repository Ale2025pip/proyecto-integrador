import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function Login() {
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    return result; // ← IMPORTANTE: devolver el resultado
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}

export default Login;