
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirección automática a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '10px' }}>Mi Perfil</h1>
      
      {user && (
        <div style={{ margin: '20px 0' }}>
          <p style={{ fontSize: '1.2rem', color: '#334155' }}>
            ¡Hola de nuevo, <strong style={{ color: '#3b82f6' }}>{user.email}</strong>!
          </p>
          <span style={{ display: 'inline-block', marginTop: '10px', padding: '4px 12px', backgroundColor: '#e2e8f0', borderRadius: '15px', fontSize: '0.85rem', color: '#475569', fontWeight: 'bold' }}>
            Sesión iniciada con Firebase Auth ✅
          </span>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '25px 0' }} />

      <button 
        onClick={handleLogout} 
        style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Cerrar Sesión 🚪
      </button>
    </div>
  );
}