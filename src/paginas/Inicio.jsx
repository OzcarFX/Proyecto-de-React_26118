import { ItemListContainer } from '../componentes/ItemListContainer/ItemListContainer';

export function Inicio() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{
        
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ_JnmKX8JH8Bjo7VFZ9EXiL-CQm5CWOEBG-Mez6YIyqzyYvAbjcqBuxNwW9rSCtJdJqlwWGfA2RLD7mCQ')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '50px 20px', 
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '30px',
        border: '1px solid #00ff41', // Un borde sutil verde Matrix
        boxShadow: '0 0 15px rgba(0, 255, 65, 0.2)', // Un leve brillo neón
        fontFamily: 'monospace' 
      }}>
        
        <h1 style={{ fontSize: '2.2rem', margin: '0 0 10px 0', color: '#ffffff' }}>
          ¡Bienvenido a Nuestra Tienda! 💻
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: '#00ff41', margin: 0, fontWeight: 'bold' }}>
          Encontrá los mejores productos en nuestro catálogo exclusivo.
        </p>
      </div>

      
      <section>
       
        <h2 style={{ borderBottom: '2px solid #00ff41', paddingBottom: '8px', color: '#333' }}>
          🔥 Productos Destacados
        </h2>
        <div style={{ padding: '10px 0' }}>
          <ItemListContainer />
        </div>
      </section>

    </div>
  );
}