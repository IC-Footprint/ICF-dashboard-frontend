import { DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { TabMenu } from 'primereact/tabmenu';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import type { FC } from 'react';
import type { TabMenuTabChangeEvent } from 'primereact/tabmenu';
import type { DataLayoutType } from '@/models/dashboard/data-layout-type';
import type { MenuItem } from 'primereact/menuitem';

import { StyledCard } from '@/theme/styled-components';
import { appRoutes } from '@/router/app-routes';
import useDashboard from '@/helpers/state/useDashboard';

const CarbonAccounts: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    actions: { setDataLayout },
    dataLayout
  } = useDashboard();

  const menuItems = useMemo((): MenuItem[] => {
    return [
      {
        label: t('dashboard.carbonAccounts.nodeOperators.title') ?? '',
        url: appRoutes.nodeOperators.root
      },
      {
        label: t('dashboard.carbonAccounts.nodes.title') ?? '',
        url: appRoutes.nodes.root
      },
      {
        label: t('dashboard.carbonAccounts.projects.title') ?? '',
        url: appRoutes.projects.root
      },
      {
        label: t('dashboard.carbonAccounts.wallets.title') ?? '',
        disabled: true
      }
    ];
  }, [t]);

  const activeTabIndex = useMemo(() => {
    const activeTabPath = location.pathname.split('/').pop();
    return menuItems.findIndex((item) => item.url === `/${activeTabPath}`) ?? 0;
  }, [location, menuItems]);

  const onTabChange = (e: TabMenuTabChangeEvent) => {
    e.originalEvent.preventDefault();

    if (e.value.url) {
      navigate(e.value.url);
    }
  };

  return (
    <StyledCard>
      <h2 className="text-color">{t('dashboard.carbonAccounts.title')}</h2>
      <div className="flex align-items-center gap-3 mx-2">
        <TabMenu
          model={menuItems}
          className="flex-1"
          onTabChange={onTabChange}
          activeIndex={activeTabIndex}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder={t('common.search') ?? ''} />
        </span>
        <DataViewLayoutOptions
          layout={dataLayout}
          onChange={(e) => setDataLayout(e.value as DataLayoutType)}
        />
      </div>
      <div className="mt-3">
        <Outlet />
      </div>
    </StyledCard>
  );
};

export default CarbonAccounts;
