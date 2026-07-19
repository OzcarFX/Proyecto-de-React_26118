
import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Verifico si el producto ya existe en el carrito
  const isInCart = (id) => cart.some(item => item.id === id);

  // Agregar productos manejando duplicados
  const addToCart = (product, quantity) => {
    if (isInCart(product.id)) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart(prev => [...prev, { ...product, quantity }]);
    }
  };

  // Eliminar un producto específico del carrito
  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Vaciar carrito por completo
  const clearCart = () => setCart([]);

  // Saber cuántos items totales hay 
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Saber el precio total acumulado
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  // Saber qué cantidad de un producto específico ya hay en el carrito
  const getCantidadActual = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? (item.quantity || item.cantidad) : 0;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeItem, 
      clearCart, 
      getCartQuantity, 
      getCartTotal,
      getCantidadActual
    }}>
      {children}
    </CartContext.Provider>
  );
};