
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import styles from './Gestion.module.css';

export function Gestion() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  // --- ESTADOS DEL CATÁLOGO ---
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);


  const [productoAEditar, setProductoAEditar] = useState(null);

  // --- ESTADOS DEL FORMULARIO ---
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  // Lógica del botón de salir 
    const handleLogoutYHome = async () => {
    const confirmacion = window.confirm("¿Desea cerrar la sesión de administración y volver al inicio?");
    if (confirmacion) {
      try {
        await logout(); 
        navigate('/');  // Redirección inmediata al Home.
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  // Traer productos de Firebase al cargar el componente
  const obtenerProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const querySnapshot = await getDocs(productosRef);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(docs);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Sincronización del Formulario y el Estado de Edición
  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setPrecio(productoAEditar.precio);
      setCategoria(productoAEditar.categoria);
      setStock(productoAEditar.stock);
      setImagen(productoAEditar.imagen);
    } else {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setStock('');
      setImagen('');
    }
  }, [productoAEditar]);

  // Validación y Envío Dinámico
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      alert("❌ El campo nombre no puede estar vacío.");
      return;
    }

    const precioNumerico = Number(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      alert("❌ El campo precio debe ser un valor numérico y mayor que cero.");
      return;
    }

    const productoFinal = {
      nombre: nombre.trim(),
      precio: precioNumerico,
      categoria: categoria.trim(),
      stock: Number(stock),
      imagen: imagen.trim()
    };

    try {
      if (productoAEditar) {
        const docRef = doc(db, "productos", productoAEditar.id);
        await updateDoc(docRef, productoFinal);
        
        alert("🎉 Producto actualizado con éxito en la nube.");
        setProductoAEditar(null);
      } else {
        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, productoFinal);
        
        alert("🎉 Producto creado y guardado con éxito.");
      }
      
      obtenerProductos();
    } catch (error) {
      console.error("Error en la operación:", error);
      alert("Hubo un error al procesar los datos.");
    }
  };

  // Eliminar Producto con Confirmación 
  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de eliminar este producto? Esta acción es irreversible.");
    
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);
        await deleteDoc(docRef);
        
        setProductos(productos.filter(prod => prod.id !== id));
        alert("Producto eliminado correctamente.");
        
        if (productoAEditar?.id === id) setProductoAEditar(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el producto.");
      }
    }
  };

  const handleEditClick = (prod) => setProductoAEditar(prod);
  const cancelarEdicion = () => setProductoAEditar(null);

  if (cargando) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando panel de gestión... ☁️</h2>;

  return (
    <div className={styles.contenedorGestion}>
      
      
      <div className={styles.columnaFormulario}>
        <h3>{productoAEditar ? '📝 Editar Producto' : '📦 Agregar Nuevo Producto'}</h3>
        
        <form onSubmit={manejarEnvio} className={styles.formulario}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <input type="url" placeholder="URL Imagen Directa (ImgBB)" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
          
          {imagen && (
            <div className={styles.vistaPrevia}>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Vista previa:</p>
              <img src={imagen} alt="Previsualización" />
            </div>
          )}

          
          <div className={styles.grupoBotones}>
            <button type="submit" className={productoAEditar ? styles.btnActualizar : styles.btnGuardar}>
              {productoAEditar ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
            
            {/* Botón Logout*/}
            <button 
              type="button" 
              onClick={handleLogoutYHome} 
              className={styles.btnCancelar} 
              style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
            >
              Cerrar Sesión 🚪
            </button>
            
            
            {productoAEditar && (
              <button type="button" onClick={cancelarEdicion} className={styles.btnCancelar}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* COLUMNA LISTADO DE PRODUCTOS */}
      <div className={styles.columnaLista}>
        <h3>Catálogo Actual ({productos.length})</h3>
        {productos.length === 0 ? (
          <p>No hay productos en la base de datos.</p>
        ) : (
          productos.map(prod => (
            <div key={prod.id} className={styles.itemProducto}>
              <div>
                <strong>{prod.nombre}</strong> - ${prod.precio} (Stock: {prod.stock})
              </div>
              <div>
                <button onClick={() => handleEditClick(prod)} className={styles.btnEditar}>Editar</button>
                <button onClick={() => handleDelete(prod.id)} className={styles.btnEliminar}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
