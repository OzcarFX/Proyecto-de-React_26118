
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import styles from './Item.module.css';

export function Item({ id, nombre, precio, imagen }) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(1); // Controla la cantidad a añadir
  const { addToCart } = useCart();

  const marcarComoFavorito = (e) => {
    e.stopPropagation();
    setEsFavorito(!esFavorito);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    const producto = { id, nombre, precio, imagen };
    addToCart(producto, cantidad);
    alert(`¡Agregaste ${cantidad} unidad/es de ${nombre} al carrito!`);
    setCantidad(1); // Reseteamos el contador a 1
  };

  return (
    <div className={styles.card}>
      <Link to={`/producto/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.contenedorImagen}>
          <img src={imagen} alt={nombre} className={styles.imagen} />
        </div>
        <div className={styles.info}>
          <h3>{nombre}</h3>
          <p className={styles.precio}>${precio.toLocaleString('es-AR')}</p>
        </div>
      </Link>

      <div className={styles.info}>
        {}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <button onClick={(e) => { e.stopPropagation(); if(cantidad > 1) setCantidad(cantidad - 1) }} style={{ padding: '2px 8px' }}>-</button>
          <span>{cantidad}</span>
          <button onClick={(e) => { e.stopPropagation(); setCantidad(cantidad + 1) }} style={{ padding: '2px 8px' }}>+</button>
        </div>

        <div className={styles.acciones}>
          <button className={styles.botonComprar} onClick={handleAddToCart}>
            Añadir producto
          </button>
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