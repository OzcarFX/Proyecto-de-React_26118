
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ProductoDetalle() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
   
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => {
       
        const encontrado = data.find(p => p.id === parseInt(id));
        setProducto(encontrado);
      })
      .catch(err => console.error("Error cargando detalle:", err))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <h2>Cargando información del producto...</h2>;
  if (!producto) return <h2>Producto no encontrado.</h2>;

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen || producto.urlImagen} alt={producto.nombre} style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
      <h3 style={{ color: '#28a745' }}>${producto.precio}</h3>
      <p>{producto.descripcion || "Sin descripción disponible por el momento."}</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>← Volver al Inicio</Link>
    </div>
  );
}