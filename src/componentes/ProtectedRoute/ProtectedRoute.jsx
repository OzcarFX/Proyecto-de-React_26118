
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Verificando sesión...</div>;
  }

  if (!user) {
    // Si no está logueado, lo mando a la ruta de login
    return <Navigate to="/login" replace />;
  }

  return children;
}