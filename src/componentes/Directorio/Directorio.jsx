import { useState, useEffect } from 'react';
import { TarjetaContacto } from '../TarjetaContacto/TarjetaContacto';
import styles from './Directorio.module.css';

// HERRAMIENTAS DE FIREBASE 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config'; 

export function Directorio() {
  
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //FUNCIÓN ASÍNCRONA PARA TRAER LOS DATOS DE LA NUBE
    const obtenerEquipo = async () => {
      try {
        
        const equipoRef = collection(db, "equipo");
        const querySnapshot = await getDocs(equipoRef);
        
        // Mapeo los documentos de Firebase a un array
        const datosFirebase = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setNosotros(datosFirebase);
      } catch (err) {
        console.error(err);
        setError('No se pudo obtener la información del equipo desde Firebase.');
      } finally {
        setCargando(false);
      }
    };

    obtenerEquipo();
  }, []); // Se ejecuta solo una vez al montar el componente

  
  if (cargando) {
    return <p className={styles.infoMensaje}>⏳ Cargando equipo de creadores desde la nube... ☁️</p>;
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
