// src/componentes/ItemListContainer/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Por si usás filtrado por categoría
import { collection, getDocs } from 'firebase/firestore'; // Módulos de Firebase
import { db } from '../../firebase/config'; // Tu conexión recién creada
import { ItemList } from '../ItemList/ItemList'; // Tu componente de presentación

export function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); // Si usás rutas para filtrar (ej: /category/tecnologia)

  useEffect(() => {
    setLoading(true);

    const obtenerProductos = async () => {
      try {
        // 1. Apuntamos a la colección "productos" en tu consola de Firebase
        const productosRef = collection(db, "productos");
        
        // 2. Traemos todos los documentos de esa colección
        const querySnapshot = await getDocs(productosRef);
        
        // 3. Procesamos los datos complejos de Firebase para convertirlos en un array limpio de JS
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // 4. Si tenías lógica de filtrado por categoría en la Clase 7, la aplicamos acá de forma local por ahora:
        if (categoryId) {
          const productosFiltrados = docs.filter(prod => prod.categoria === categoryId);
          setProductos(productosFiltrados);
        } else {
          setProductos(docs);
        }

      } catch (error) {
        console.error("Error trayendo productos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [categoryId]); // Se ejecuta al montar y si cambia la categoría en la URL

  // Manejo del estado de carga (visto en Clase 6)
  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Cargando catálogo desde Firebase... ☁️</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <ItemList productos={productos} />
    </div>
  );
}