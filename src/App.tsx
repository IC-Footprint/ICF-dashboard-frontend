import { RouterProvider } from 'react-router-dom';

import { Providers } from '@/helpers/Providers';
import router from '@/router';

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
