import { RouterProvider } from 'react-router-dom';

import Layout from '@/components/Layout';
import Providers from '@/helpers/Providers';
import router from '@/router';

function App() {
  return (
    <Providers>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Providers>
  );
}

export default App;
