
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


  const addToCart = (product, quantity) => {
    const itemInCart = cart.find(item => item.id === product.id);
    
    if (itemInCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Saber cuántos items totales hay 
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Saber el precio total acumulado
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      clearCart, 
      getCartQuantity, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};