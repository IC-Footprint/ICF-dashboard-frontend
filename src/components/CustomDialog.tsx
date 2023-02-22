import type { FC, PropsWithChildren } from 'react';
import type { DialogSize } from '@/models/dialog-size-props';

import useViewport from '@/helpers/useViewport';
import { StyledDialog } from '@/theme/styled-components';

interface CustomDialogProps extends PropsWithChildren {
  visible: boolean;
  onHide: () => void;
  onShow: () => void;
  showHeader: boolean;
  size?: DialogSize;
}

const CustomDialog: FC<CustomDialogProps> = ({
  onShow,
  showHeader,
  visible,
  onHide,
  children,
  size = 'large'
}) => {
  const { isMobile } = useViewport();

  return (
    <StyledDialog
      onShow={onShow}
      onHide={onHide}
      visible={visible}
      showHeader={showHeader}
      $size={size}
      $isMobile={isMobile}
    >
      {children}
    </StyledDialog>
  );
};

export default CustomDialog;
