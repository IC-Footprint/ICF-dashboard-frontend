import { createContext, useContext, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import type { FC, PropsWithChildren } from 'react';

import { RootContainer } from '@/theme/styled-components';
import { breakpoints } from '@/utils/breakpoints';

interface ViewportBreakpoints {
  isMobile: boolean;
}

const ViewportContext = createContext<ViewportBreakpoints>({
  isMobile: false
});

export const ViewportProvider: FC<PropsWithChildren> = ({ ...props }) => {
  const { width, ref: layoutContainerRef } = useResizeDetector();

  const value: ViewportBreakpoints = useMemo(() => {
    return {
      isMobile: (width ?? 0) < breakpoints.mobile
    };
  }, [width]);

  return (
    <RootContainer ref={layoutContainerRef}>
      <ViewportContext.Provider value={value} {...props} />
    </RootContainer>
  );
};

const useViewport: () => ViewportBreakpoints = () =>
  useContext(ViewportContext);

export default useViewport;
