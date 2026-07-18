
import { Routes, Route } from 'react-router-dom';
import { Layout } from './componentes/layout/Layout';
import { Inicio } from './paginas/Inicio'; 
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer'; 
import { ProductoDetalle } from './componentes/Productos/ProductoDetalle'; 
import Cart from './componentes/Cart/Cart'; 

import { Gestion } from './componentes/Gestion/Gestion';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/admin" element={<Gestion />} />
      </Route>
    </Routes>
  );
}

export default App;

