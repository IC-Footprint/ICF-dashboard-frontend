import { Navigate, Route, Routes } from 'react-router-dom';

import type { FC } from 'react';

import WhitePaper from '@/pages/WhitePaper';
import Layout from '@/components/Layout';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Node from '@/pages/Node';
import Nodes from '@/pages/Nodes';
import Subnets from '@/pages/Subnets';
import { appRoutes } from '@/router/app-routes';

const AppRoutes: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={appRoutes.home.root} element={<Home />}></Route>
        <Route
          path={appRoutes.oldDashboard.root}
          element={<Dashboard />}
        ></Route>
        <Route path={appRoutes.nodes.root} element={<Nodes />}></Route>
        <Route path={appRoutes.nodes.show} element={<Node />} />
        <Route path={appRoutes.subnets.root} element={<Subnets />}></Route>
        <Route path={appRoutes.about.root} element={<About />}></Route>
        <Route
          path={appRoutes.whitePaper.root}
          element={<WhitePaper />}
        ></Route>
        <Route
          path="/*"
          element={<Navigate to={appRoutes.home.root} />}
        ></Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
