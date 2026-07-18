// src/componentes/Cart/Cart.jsx
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, clearCart, getCartTotal, getCartQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#64748b', margin: '15px 0' }}>Agregá algunos componentes épicos para continuar.</p>
        <Link to="/" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Tu Carrito ({getCartQuantity()} productos)</h1>
      
      <div style={{ marginTop: '20px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={item.imagen} alt={item.nombre} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <div>
                <h4 style={{ margin: 0 }}>{item.nombre}</h4>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                  ${item.precio.toLocaleString('es-AR')} x {item.quantity}
                </p>
              </div>
            </div>
            <p style={{ fontWeight: 'bold' }}>
              ${(item.precio * item.quantity).toLocaleString('es-AR')}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '2px solid #cbd5e1', paddingTop: '20px' }}>
        <h3>Total a pagar: <span style={{ color: '#10b981' }}>${getCartTotal().toLocaleString('es-AR')}</span></h3>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={clearCart} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
            Vaciar Carrito
          </button>
          <button onClick={() => alert('¡Próximamente!')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}