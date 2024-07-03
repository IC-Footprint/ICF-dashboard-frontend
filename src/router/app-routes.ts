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
  sns: {
    root: '/dashboard/sns',
    details: '/dashboard/sns/:snsId'
  },
  network: {
    root: '/network'
  },
  whitePaper: {
    root: '/white-paper'
  },
  about: {
    root: '/about'
  },
  legalDisclaimer: {
    root: '/legal-disclaimer'
  }
};
