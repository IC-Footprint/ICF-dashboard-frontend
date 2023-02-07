import { useTranslation } from 'react-i18next';

import type { FC, PropsWithChildren } from 'react';

import { PageContent } from '@/theme/styled-components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <PageContent>
      <h3>{t('common.internetComputerFootprint')}</h3>
      {children}
    </PageContent>
  );
};

export default Layout;
