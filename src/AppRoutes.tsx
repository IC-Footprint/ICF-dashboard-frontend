import { Navigate, Route, Routes } from 'react-router-dom';

import type { FC } from 'react';

import Layout from '@/components/Layout';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Node from '@/pages/Node';
import Network from '@/pages/Network';
import WhitePaper from '@/pages/WhitePaper';
import { appRoutes } from '@/router/app-routes';
import NodeProviders from '@/pages/dashboard/NodeProviders';
import Nodes from '@/pages/dashboard/Nodes';
import Projects from '@/pages/dashboard/Projects';

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
          <Route path={appRoutes.projects.root} element={<Projects />} />
        </Route>
        <Route path={appRoutes.nodes.show} element={<Node />} />
        <Route path={appRoutes.network.root} element={<Network />}></Route>
        <Route
          path={appRoutes.oldDashboard.root}
          element={<Dashboard />}
        ></Route>
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
