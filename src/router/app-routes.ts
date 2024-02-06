export const appRoutes = {
  home: {
    root: '/dashboard'
  },
  nodes: {
    root: '/dashboard/nodes',
    show: '/dashboard/nodes/:nodeId'
  },
  projects: {
    root: '/dashboard/projects',
    details: '/projects/:projectId'
  },
  nodeProviders: {
    root: '/dashboard/node-providers',
    details: '/node-providers/:nodeProviderId'
  },
  network: {
    root: '/network'
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
  },
  subnets: {
    root: '/subnets'
  }
};
