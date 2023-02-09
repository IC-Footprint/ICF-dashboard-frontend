import AppRoutes from '@/AppRoutes';

import Providers from '@/helpers/Providers';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
