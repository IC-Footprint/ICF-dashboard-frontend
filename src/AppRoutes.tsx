import { Navigate, Route, Routes } from 'react-router-dom';

import type { FC } from 'react';

import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Nodes from '@/pages/Nodes';
import { appRoutes } from '@/router/app-routes';

const AppRoutes: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={appRoutes.home.root} element={<Dashboard />}></Route>
        <Route path={appRoutes.nodes.root} element={<Nodes />}></Route>
        <Route
          path="/*"
          element={<Navigate to={appRoutes.home.root} />}
        ></Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
