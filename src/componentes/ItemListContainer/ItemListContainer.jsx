
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { collection, getDocs } from 'firebase/firestore'; // Módulos de Firebase
import { db } from '../../firebase/config'; 
import { ItemList } from '../ItemList/ItemList'; 

export function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); 

  useEffect(() => {
    setLoading(true);

    const obtenerProductos = async () => {
      try {
        
        const productosRef = collection(db, "productos");
        
       
        const querySnapshot = await getDocs(productosRef);
        
       
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        
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
  }, [categoryId]); 
  // Manejo del estado de carga
  if (loading) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Cargando catálogo desde Firebase... ☁️</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <ItemList productos={productos} />
    </div>
  );
}