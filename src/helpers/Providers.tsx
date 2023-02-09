import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import type { FC, PropsWithChildren } from 'react';

import store from '@/state/build-store';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default Providers;
