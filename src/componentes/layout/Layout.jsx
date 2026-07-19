import { Link, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import { Directorio } from '../Directorio/Directorio';
import styles from './Layout.module.css';

export function Layout() {
  const { getCartQuantity } = useCart(); 
  const totalItems = getCartQuantity();

  return (
    <div className={styles.contenedor}>
      
      <header className={styles.header}>
        <div className={styles.logo}>🚀*** TechTienda</div>
        <nav className={styles.nav}>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <a href="#">Contacto</a>
          
          
          <Link to="/admin" className={styles.linkAdmin}>
            Admin 🛠️
          </Link>
          
          <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            🛒 Carrito 
            {totalItems > 0 && (
              <span style={{ 
                background: '#ef4444', 
                color: 'white', 
                padding: '2px 7px', 
                borderRadius: '50%', 
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </header>
      
      
      <main className={styles.main}>
        <Outlet />
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.anchoLimitado}>
          <Directorio />
          <p className={styles.copyright}>
            © 2026 Todos los derechos reservados - Muy buen curso - Gracias a todo el equipo de TalentoTech.
          </p>
        </div>
      </footer>
    </div>
  );
}