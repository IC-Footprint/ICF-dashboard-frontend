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
  nodeProviders: {
    root: '/node-providers',
    details: '/node-providers/:nodeProviderId'
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
