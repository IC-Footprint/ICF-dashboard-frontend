import { Provider } from 'react-redux';

import type { FC, PropsWithChildren } from 'react';

import store from '@/state/build-store';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
