import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function Register() {
  const { register } = useAuth();

  const handleRegister = async (email, password) => {
    const result = await register(email, password);
    return result; // ← IMPORTANTE: devolver el resultado
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}

export default Register;