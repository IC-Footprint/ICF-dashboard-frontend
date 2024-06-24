import { Navigate, Route, Routes } from 'react-router-dom';

import SNSDetails from './pages/dashboard/details/SNSDetails';

import type { FC } from 'react';

import Layout from '@/components/Layout';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Node from '@/pages/dashboard/details/Node';
import NodeProvider from '@/pages/dashboard/details/NodeProvider';
import Project from '@/pages/dashboard/details/Project';
import NodeProviders from '@/pages/dashboard/NodeProviders';
import Nodes from '@/pages/dashboard/Nodes';
import Projects from '@/pages/dashboard/Projects';
import Network from '@/pages/Network';
import WhitePaper from '@/pages/WhitePaper';
// import Dapp from '@/pages/dashboard/details/dapps';
import SNS from '@/pages/dashboard/SNS';
import { appRoutes } from '@/router/app-routes';

const AppRoutes: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={appRoutes.dashboard.root} element={<Dashboard />}>
          <Route
            index
            element={<Navigate to={appRoutes.projects.root} replace />}
          />
          <Route path={appRoutes.projects.root} element={<Projects />} />
          <Route
            path={appRoutes.nodeProviders.root}
            element={<NodeProviders />}
          />
          <Route path={appRoutes.sns.root} element={<SNS />}></Route>
          <Route path={appRoutes.nodes.root} element={<Nodes />} />
        </Route>
        <Route path={appRoutes.nodes.details} element={<Node />} />
        <Route
          path={appRoutes.nodeProviders.details}
          element={<NodeProvider />}
        ></Route>
        <Route path={appRoutes.sns.details} element={<SNSDetails />}></Route>
        <Route path={appRoutes.projects.details} element={<Project />} />
        <Route path={appRoutes.network.root} element={<Network />}></Route>
        <Route path={appRoutes.about.root} element={<About />}></Route>
        <Route
          path={appRoutes.whitePaper.root}
          element={<WhitePaper />}
        ></Route>
        <Route
          path="/*"
          element={<Navigate to={appRoutes.dashboard.root} />}
        ></Route>
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
