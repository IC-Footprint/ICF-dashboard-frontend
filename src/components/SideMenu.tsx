import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import type { MenuItem } from 'primereact/menuitem';
import type { FC } from 'react';

import logoCarbonCrowd from '@/assets/logo-carbon-crowd.svg';
import { appRoutes } from '@/router/app-routes';
import { SideMenuContainer, StyledMenu } from '@/theme/styled-components';

const SideMenu: FC = () => {
  const { t } = useTranslation();
  const menuItemTemplate = (item: MenuItem) => (
    <NavLink to={item.url ?? ''} className="p-menuitem-link">
      <span className={`p-menuitem-icon ${item.icon}`}></span>
      <span className="p-menuitem-text">{item.label}</span>
    </NavLink>
  );
  const createMenuItem = useCallback(
    (label: string, icon: string, url: string): MenuItem => {
      return {
        label,
        icon,
        url,
        template: menuItemTemplate
      };
    },
    []
  );
  const menuItems: MenuItem[] = useMemo<MenuItem[]>(() => {
    return [
      createMenuItem(t('page.home'), 'pi pi-home', appRoutes.home.root),
      createMenuItem(t('page.nodes'), 'pi pi-box', appRoutes.nodes.root)
    ];
  }, [t, createMenuItem]);

  return (
    <SideMenuContainer>
      <img src={logoCarbonCrowd} alt="Carbon Crowd" />
      <StyledMenu model={menuItems} />
    </SideMenuContainer>
  );
};

export default SideMenu;
