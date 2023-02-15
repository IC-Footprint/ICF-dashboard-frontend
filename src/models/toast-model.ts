import type { ToastMessage } from 'primereact/toast';

export type ToastSeverity = 'error' | 'info' | 'success' | 'warn';

export function createToast(
  severity: ToastSeverity,
  summary: string,
  detail: string
): ToastMessage {
  return {
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  };
}
