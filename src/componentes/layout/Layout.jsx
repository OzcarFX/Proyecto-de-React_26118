// src/componentes/layout/Layout.jsx
import { Link, Outlet } from 'react-router-dom'; // 1. Importamos Link y Outlet
import { Directorio } from '../Directorio/Directorio';
import styles from './Layout.module.css';

// 2. Ya no necesitamos recibir la prop { children }
export function Layout() {
  return (
    <div className={styles.contenedor}>
      <header className={styles.header}>
        <div className={styles.logo}>🚀 TechTienda</div>
        <nav className={styles.nav}>
          {/* 3. Cambiamos las etiquetas <a> por <Link to="..."> */}
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <a href="#">Contacto</a> {/* Podés dejarlo como link simple por ahora */}
        </nav>
      </header>
      
      <main className={styles.main}>
        {/* 4. En lugar de {children}, usamos <Outlet /> como marcador de posición dinámico */}
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
/*
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
}*/
