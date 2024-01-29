import resourcesApi from '@/api/resources-api';

test('should load the global configuration', () => {
  const globalConfiguration = resourcesApi.loadGlobalConfiguration();

  expect(Object.keys(globalConfiguration.links).length).toBe(4);
});
