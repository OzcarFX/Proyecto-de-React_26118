import { Directorio } from '../Directorio/Directorio';
import styles from './Layout.module.css';

export function Layout({ children }) {
  return (
    <div className={styles.contenedor}>
      <header className={styles.header}>
        <div className={styles.logo}>🚀 TechTienda</div>
        <nav className={styles.nav}>
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Contacto</a>
        </nav>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>
      
      
      <footer className={styles.footer}>
        <div className={styles.anchoLimitado}>
      
          <Directorio />
          
          <p className={styles.copyright}>© 2026 Todos los derechos reservados - Muy buen curso - Gracias a todo el equipo de TalentoTech.</p>
        </div>
      </footer>
    </div>
  );
}