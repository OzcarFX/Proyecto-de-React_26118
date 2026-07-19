
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute'; 

import { Layout } from './componentes/layout/Layout';
import { Inicio } from './paginas/Inicio'; 
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer'; 
import { ProductoDetalle } from './componentes/Productos/ProductoDetalle'; 
import Cart from './componentes/Cart/Cart'; 
import { Gestion } from './componentes/Gestion/Gestion';


import Perfil from './componentes/Perfil/Perfil'; 
import Login from './componentes/Login/Login'; 

function App() {
  return (
    <AuthProvider> {}
      <Routes>
        <Route element={<Layout />}>
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />

          {/*Ruta Protegida: Mi Perfil */}
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />

          {/*Ruta Protegida: Sección Gestión / Admin */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Gestion />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;