import { ItemList } from '../ItemList/ItemList';

export function ItemListContainer() {
  const productos = [
    { id: '1', nombre: 'Teclado Mecánico RGB', precio: 35990, imagen: '/images/Teclado_1.jpg' },
    { id: '2', nombre: 'Mouse Gamer Inalámbrico', precio: 28990, imagen: '/images/mouse_1.jpg' },
    { id: '3', nombre: 'Monitor 24" Full HD 144Hz', precio: 189990, imagen: '/images/monitor_1.jpg' }
  ];

  return (
    <div>
      <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Catálogo de Productos</h2>
      <ItemList productos={productos} />
    </div>
  );
}