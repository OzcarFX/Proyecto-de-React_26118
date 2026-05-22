import { Layout } from './componentes/layout/Layout';
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer';

function App() {
  return (
    <Layout>
      <div style={{ padding: '20px 0' }}>
        <ItemListContainer />
      </div>
    </Layout>
  );
}

export default App;
