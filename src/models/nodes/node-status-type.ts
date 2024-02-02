export type NodeStatusType = 'UP' | 'UNASSIGNED' | 'DOWN' | 'DEGRADED';
export type Severity = 'success' | 'info' | 'warning' | 'danger';

export const nodeStatusSeverityMap: Record<NodeStatusType, Severity> = {
  DOWN: 'danger',
  UNASSIGNED: 'warning',
  UP: 'success',
  DEGRADED: 'info'
};
