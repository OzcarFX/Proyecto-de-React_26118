
import { ItemListContainer } from '../componentes/ItemListContainer/ItemListContainer';

export function Inicio() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '35px 20px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ fontSize: '2.2rem', margin: '0 0 10px 0' }}>¡Bienvenido a Nuestra Tienda! 🚀</h1>
        <p style={{ fontSize: '1.1rem', color: '#ccc', margin: 0 }}>Encontrá los mejores productos en nuestro catálogo exclusivo.</p>
      </div>

      {}
      <section>
        <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '8px', color: '#333' }}>
          🔥 Productos Destacados
        </h2>
        <div style={{ padding: '10px 0' }}>
          <ItemListContainer />
        </div>
      </section>

    </div>
  );
}