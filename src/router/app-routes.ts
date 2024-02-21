export const appRoutes = {
  dashboard: {
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
  about: {
    root: '/about'
  }
};
