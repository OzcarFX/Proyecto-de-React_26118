import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Importamos las herramientas necesarias de Firebase
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 

export function ProductoDetalle() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Inicializamos la base de datos de Firebase
    const db = getFirestore();
    
    // 2. Apuntamos al documento específico usando el ID de la URL (que es un String)
    const queryDoc = doc(db, 'productos', id); 

    // 3. Traemos el documento desde Firestore
    getDoc(queryDoc)
      .then(res => {
        if (res.exists()) {
          // Si el producto existe, guardamos su ID de Firebase y sus datos
          setProducto({ id: res.id, ...res.data() });
        } else {
          console.log("No se encontró el documento en la base de datos");
          setProducto(null);
        }
      })
      .catch(err => console.error("Error cargando detalle desde Firebase:", err))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#00ff41', fontFamily: 'monospace' }}>Cargando información del producto...</h2>;
  
  if (!producto) return <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#ff4444' }}>Producto no encontrado.</h2>;

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '40px auto', 
      padding: '20px', 
      border: '1px solid #00ff41', // Borde verde temático Matrix
      borderRadius: '8px', 
      textAlign: 'center',
      backgroundColor: '#1a1a1a', // Fondo oscuro a tono
      color: '#ffffff',
      fontFamily: 'monospace',
      boxShadow: '0 0 15px rgba(0, 255, 65, 0.1)'
    }}>
      <h2 style={{ color: '#00ff41' }}>{producto.nombre}</h2>
      
      {/* Soporta tanto 'imagen' como 'urlImagen' según cómo lo hayas guardado en Firebase */}
      <img 
        src={producto.imagen || producto.urlImagen} 
        alt={producto.nombre} 
        style={{ width: '200px', height: '200px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '4px', padding: '10px', margin: '15px 0' }} 
      />
      
      <h3 style={{ color: '#00ff41', fontSize: '1.5rem' }}>${producto.precio}</h3>
      
      {/* CORRECCIÓN: Ahora repite el nombre del producto de Firebase como descripción */}
      <p style={{ color: '#ccc', lineHeight: '1.5', fontSize: '1.1rem' }}>
        {producto.nombre}
      </p>
      
      <hr style={{ borderColor: '#333', margin: '20px 0' }} />
      
      <Link to="/" style={{ color: '#00ff41', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Volver al Inicio
      </Link>
    </div>
  );
}