// src/componentes/Item/Item.jsx
import { useState } from 'react';
import styles from './Item.module.css';

export function Item({ nombre, precio, imagen }) {
  // Pauta 1: Generación del estado (falso por defecto)
  const [esFavorito, setEsFavorito] = useState(false);

  // Pauta 2: Actualización dinámica (invierte el booleano actual)
  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.card}>
      <div className={styles.contenedorImagen}>
        <img src={imagen} alt={nombre} className={styles.imagen} />
      </div>
      <div className={styles.info}>
        <h3>{nombre}</h3>
        <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
        
        <div className={styles.acciones}>
          <button className={styles.botonComprar}>Añadir producto</button>
          
          {/* Pauta 3: Asignación de la función al evento onClick de la estrella */}
          <span 
            className={`${styles.estrella} ${esFavorito ? styles.activa : ''}`}
            onClick={marcarComoFavorito}
          >
            {esFavorito ? '★' : '☆'}
          </span>
        </div>
      </div>
    </div>
  );
}