import styled from '@emotion/styled';
import { DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { TabMenu } from 'primereact/tabmenu';
import { Tag } from 'primereact/tag';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import type { FC, MouseEvent } from 'react';
import type { TabMenuTabChangeEvent } from 'primereact/tabmenu';
import type { MenuItem } from 'primereact/menuitem';
import type { DataLayoutType } from '@/models/dashboard/data-layout-type';

import { StyledCard } from '@/theme/styled-components';
import { appRoutes } from '@/router/app-routes';
import useDashboard from '@/helpers/state/useDashboard';

const FeatureStatusTag = styled(Tag)`
  &.p-tag {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: normal;

    &.p-tag-info {
      border-color: var(--text-color);
      color: var(--text-color);
    }
  }
`;

const CarbonAccounts: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    actions: { setDataLayout, setSearchFilter },
    dataLayout,
    searchFilter
  } = useDashboard();

  const itemWithFeatureStatus = useCallback(
    (item: MenuItem) => {
      const onLinkClick = (e: MouseEvent) => {
        e.preventDefault();
        navigate(item.url ?? '');
      };

      return (
        <a
          href={item.url}
          className="p-menuitem-link"
          role="presentation"
          onClick={onLinkClick}
        >
          <span className="p-menuitem-text mr-2">{item.label}</span>
          {item.icon ? item.icon : null}
        </a>
      );
    },
    [navigate]
  );

  const menuItems = useMemo((): MenuItem[] => {
    return [
      {
        label: t('dashboard.carbonAccounts.dapps.title') ?? '',
        // disabled:true,
        url: appRoutes.sns.root,
        icon: (
          <FeatureStatusTag>{t('common.featureStatus.new')}</FeatureStatusTag>
        ),
        template: itemWithFeatureStatus
      },
      {
        label: t('dashboard.carbonAccounts.projects.title') ?? '',
        disabled: true,
        url: appRoutes.projects.root,
        icon: (
          <FeatureStatusTag>{t('common.featureStatus.new')}</FeatureStatusTag>
        ),
        template: itemWithFeatureStatus
      },
      {
        label: t('dashboard.carbonAccounts.nodeProviders.title') ?? '',
        url: appRoutes.nodeProviders.root
      },
      {
        label: t('dashboard.carbonAccounts.nodes.title') ?? '',
        url: appRoutes.nodes.root
      },
      {
        label: t('dashboard.carbonAccounts.individuals.title') ?? '',
        disabled: true,
        icon: (
          <FeatureStatusTag severity="info">
            {t('common.featureStatus.comingSoon')}
          </FeatureStatusTag>
        ),
        template: itemWithFeatureStatus
      }
    ];
  }, [t, itemWithFeatureStatus]);

  const activeTabIndex = useMemo(() => {
    const activeTabPath = location.pathname;
    return menuItems.findIndex((item) => item.url === activeTabPath) ?? 0;
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
          <InputText
            placeholder={t('common.search') ?? ''}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
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
