import AppRoutes from '@/AppRoutes';

import Providers from '@/helpers/Providers';
import { globalStyles } from '@/theme/global';

function App() {
  return (
    <Providers>
      {globalStyles}
      <AppRoutes />
    </Providers>
  );
}

export default App;
