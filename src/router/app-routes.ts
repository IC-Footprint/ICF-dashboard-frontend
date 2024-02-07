export const appRoutes = {
  home: {
    root: '/dashboard'
  },
  nodes: {
    root: '/dashboard/nodes',
    details: '/dashboard/nodes/:nodeId'
  },
  projects: {
    root: '/dashboard/projects',
    details: '/dashboard/projects/:projectId'
  },
  nodeProviders: {
    root: '/dashboard/node-providers',
    details: '/dashboard/node-providers/:nodeProviderId'
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
