import type { RouteObject } from 'react-router-dom';

import Nodes from '@/pages/Nodes';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Nodes />
  }
];
