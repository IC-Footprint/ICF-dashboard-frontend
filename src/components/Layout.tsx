import { Button } from 'primereact/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResizeDetector } from 'react-resize-detector';

import type { FC, PropsWithChildren } from 'react';

import useSignUp from '@/helpers/state/useSignUp';
import SignUp from '@/components/sign-up/SignUp';
import { breakpoints } from '@/utils/breakpoints';
import MenuIcon from '@/theme/assets/icons/menu';
import SideMenu from '@/components/SideMenu';
import {
  LayoutContainer,
  PageContent,
  SideMenuContainer,
  StyledDialog,
  StyledSidebar,
  TopNavBar
} from '@/theme/styled-components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const { width, ref: layoutContainerRef } = useResizeDetector();
  const {
    actions: { showSignUpModal, hideSignUpModal },
    isSignUpModalVisible
  } = useSignUp();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const isMobile: boolean = useMemo(() => {
    return (width ?? 0) < breakpoints.mobile;
  }, [width]);

  const closeSideMenu = useCallback(() => {
    setIsSidebarVisible(false);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      closeSideMenu();
    }
  }, [isMobile, closeSideMenu]);

  return (
    <LayoutContainer ref={layoutContainerRef}>
      {isMobile ? (
        <>
          <TopNavBar>
            <Button
              severity="secondary"
              text
              className="w-2rem p-0"
              onClick={() => setIsSidebarVisible(true)}
            >
              <MenuIcon />
            </Button>
          </TopNavBar>
          <StyledSidebar
            visible={isSidebarVisible}
            onHide={closeSideMenu}
            showCloseIcon={false}
            className="w-14rem"
          >
            <SideMenu onItemClick={closeSideMenu} />
          </StyledSidebar>
        </>
      ) : (
        <SideMenuContainer>
          <SideMenu />
        </SideMenuContainer>
      )}
      <PageContent isMobile={isMobile}>
        <h3>{t('common.internetComputerFootprint')}</h3>
        {children}
      </PageContent>
      <StyledDialog
        visible={isSignUpModalVisible}
        onHide={hideSignUpModal}
        onShow={showSignUpModal}
        showHeader={false}
      >
        <SignUp />
      </StyledDialog>
    </LayoutContainer>
  );
};

export default Layout;
