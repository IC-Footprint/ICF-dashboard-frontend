import { Navigate, Route, Routes } from 'react-router-dom';

import type { FC } from 'react';

import NodeProviders from '@/components/dashboard/carbon-accounts/NodeProviders';
import Layout from '@/components/Layout';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Node from '@/pages/Node';
import Subnets from '@/pages/Subnets';
import WhitePaper from '@/pages/WhitePaper';
import { appRoutes } from '@/router/app-routes';
import Nodes from '@/pages/Nodes';

const AppRoutes: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={appRoutes.home.root} element={<Home />}>
          <Route
            index
            element={<Navigate to={appRoutes.nodeProviders.root} replace />}
          />
          <Route
            index
            path={appRoutes.nodeProviders.root}
            element={<NodeProviders />}
          />
          <Route path={appRoutes.nodes.root} element={<Nodes />} />
          <Route path={appRoutes.projects.root} element={<div>Projects</div>} />
        </Route>
        <Route
          path={appRoutes.oldDashboard.root}
          element={<Dashboard />}
        ></Route>
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
