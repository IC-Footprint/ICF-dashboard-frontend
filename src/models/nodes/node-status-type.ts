export type NodeStatusType = 'UP' | 'UNASSIGNED' | 'DOWN' | 'DEGRADED' | 'BETA';
export type Severity = 'success' | 'info' | 'warning' | 'danger' | 'Beta';

export const nodeStatusSeverityMap: Record<NodeStatusType, Severity> = {
  DOWN: 'danger',
  UNASSIGNED: 'warning',
  UP: 'success',
  DEGRADED: 'info',
  BETA: 'Beta'
};
