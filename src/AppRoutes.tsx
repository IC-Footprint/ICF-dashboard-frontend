import { Navigate, Route, Routes } from 'react-router-dom';

import type { FC } from 'react';

import Layout from '@/components/Layout';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Nodes from '@/pages/Nodes';
import Subnets from '@/pages/Subnets';
import { appRoutes } from '@/router/app-routes';
import Node from '@/pages/Node';

const AppRoutes: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={appRoutes.home.root} element={<Dashboard />}></Route>
        <Route path={appRoutes.nodes.root} element={<Nodes />}></Route>
        <Route path={appRoutes.nodes.show} element={<Node />} />
        <Route path={appRoutes.subnets.root} element={<Subnets />}></Route>
        <Route path={appRoutes.about.root} element={<About />}></Route>
        <Route
          path="/*"
          element={<Navigate to={appRoutes.home.root} />}
        ></Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
