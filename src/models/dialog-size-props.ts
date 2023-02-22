import type { ViewportOptionsProps } from '@/models/viewport-options-props';

export type DialogSize = 'small' | 'large';

export interface DialogSizeProps extends ViewportOptionsProps {
  $size?: DialogSize;
}
