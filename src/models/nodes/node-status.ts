export type NodeStatus = 'UP' | 'UNASSIGNED' | 'DOWN';
export type Severity = 'success' | 'info' | 'warning' | 'danger';

export const nodeStatusSeverityMap: Record<NodeStatus, Severity> = {
  DOWN: 'danger',
  UNASSIGNED: 'warning',
  UP: 'success'
};
