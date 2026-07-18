
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.css';

export function Item({ id, nombre, precio, imagen }) {
  const [esFavorito, setEsFavorito] = useState(false);

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.card}>
      
      {}
      <Link to={`/producto/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.contenedorImagen}>
          <img src={imagen} alt={nombre} className={styles.imagen} />
        </div>
        
        <div className={styles.info}>
          <h3>{nombre}</h3>
          <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
        </div>
      </Link>

      {}
      <div className={styles.info}>
        <div className={styles.acciones}>
          <button className={styles.botonComprar}>Añadir producto</button>
          
          <span 
            className={`${styles.estrella} ${esFavorito ? styles.activa : ''}`}
            onClick={marcarComoFavorito}
            style={{ cursor: 'pointer' }}
          >
            {esFavorito ? '★' : '☆'}
          </span>
        </div>
      </div>

    </div>
  );
}