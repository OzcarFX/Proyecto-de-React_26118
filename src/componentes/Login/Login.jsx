
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // autenticar con las credenciales ingresadas
      await signInWithEmailAndPassword(auth, email, password);
      
      // Si sale bien, mando al usuario directo a la gestión de Admin 
      navigate('/admin');
    } catch (err) {
      console.error(err.code);
      // Manejo de errores de Firebase
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('El correo o la contraseña son incorrectos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico no es válido.');
      } else {
        setError('Ocurrió un error inesperado. Intentá de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '20px' }}>Iniciar Sesión 🔐</h2>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Correo Electrónico:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ejemplo@correo.com"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ 
            backgroundColor: cargando ? '#94a3b8' : '#3b82f6', 
            color: 'white', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '5px', 
            fontWeight: 'bold', 
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            marginTop: '10px',
            transition: 'background-color 0.2s'
          }}
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}