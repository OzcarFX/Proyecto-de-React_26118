import { useState, useEffect } from 'react';
import { TarjetaContacto } from '../TarjetaContacto/TarjetaContacto';
import styles from './Directorio.module.css';

export function Directorio() {
  
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      fetch('/data/nosotros.json')
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información del equipo.');
          }
          return respuesta.json();
        })
        .then((datos) => {
          setNosotros(datos);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setCargando(false);
        });
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  
  if (cargando) {
    return <p className={styles.infoMensaje}>⏳ Cargando equipo de creadores...</p>;
  }

  if (error) {
    return <p className={styles.errorMensaje}>❌ Error: {error}</p>;
  }

  return (
    <div className={styles.seccionDirectorio}>
      <h3 className={styles.tituloSeccion}>Creadores del Sitio</h3>
      <div className={styles.grilla}>
        {nosotros.map((persona) => (
          <TarjetaContacto key={persona.id} {...persona} />
        ))}
      </div>
    </div>
  );
}