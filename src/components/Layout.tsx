import { useTranslation } from 'react-i18next';

import type { FC, PropsWithChildren } from 'react';

import SideMenu from '@/components/SideMenu';
import { LayoutContainer, PageContent } from '@/theme/styled-components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <LayoutContainer>
      <SideMenu />
      <PageContent>
        <h3>{t('common.internetComputerFootprint')}</h3>
        {children}
      </PageContent>
    </LayoutContainer>
  );
};

export default Layout;
