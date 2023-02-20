import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import type { FC, PropsWithChildren } from 'react';

import { ViewportProvider } from '@/helpers/useViewport';
import store from '@/state/build-store';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <ViewportProvider>{children}</ViewportProvider>
      </Router>
    </Provider>
  );
};

export default Providers;
