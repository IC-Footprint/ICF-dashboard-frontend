import { Button } from 'primereact/button';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC, PropsWithChildren } from 'react';

import SideMenu from '@/components/SideMenu';
import SignUp from '@/components/sign-up/SignUp';
import useSignUp from '@/helpers/state/useSignUp';
import useViewport from '@/helpers/useViewport';
import MenuIcon from '@/theme/assets/icons/menu';
import {
  PageContent,
  SideMenuContainer,
  StyledDialog,
  StyledSidebar,
  TopNavBar
} from '@/theme/styled-components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const {
    actions: { showSignUpModal, hideSignUpModal },
    isSignUpModalVisible
  } = useSignUp();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const closeSideMenu = useCallback(() => {
    setIsSidebarVisible(false);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      closeSideMenu();
    }
  }, [isMobile, closeSideMenu]);

  return (
    <>
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
    </>
  );
};

export default Layout;
