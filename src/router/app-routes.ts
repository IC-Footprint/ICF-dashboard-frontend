export const appRoutes = {
  home: {
    root: '/'
  },
  nodes: {
    root: '/nodes',
    show: '/nodes/:nodeId'
  },
  subnets: {
    root: '/subnets'
  },
  projects: {
    root: '/projects',
    details: '/projects/:projectId'
  },
  nodeOperators: {
    root: '/node-operators',
    details: '/node-operators/:nodeOperatorId'
  },
  whitePaper: {
    root: '/white-paper'
  },
  // TODO: delete routes below
  about: {
    root: '/about'
  },
  oldDashboard: {
    root: '/oldDashboard'
  }
};
