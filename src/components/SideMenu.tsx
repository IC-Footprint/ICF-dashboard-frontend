import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import type { MenuItem } from 'primereact/menuitem';
import type { FC, ReactNode } from 'react';

import logoCarbonCrowd from '@/theme/assets/logo-carbon-crowd.svg';
import CubeIcon from '@/theme/assets/icons/cube';
import HomeIcon from '@/theme/assets/icons/home';
import { appRoutes } from '@/router/app-routes';
import {
  FlexColumnWithRowGap,
  SideMenuContainer,
  StyledMenu
} from '@/theme/styled-components';

const SideMenu: FC = () => {
  const { t } = useTranslation();
  const menuItemTemplate = (item: MenuItem) => (
    <NavLink to={item.url ?? ''} className="p-menuitem-link">
      <i className="menu-item-icon">{item.icon}</i>
      <span className="p-menuitem-text">{item.label}</span>
    </NavLink>
  );
  const createMenuItem = useCallback(
    (label: string, icon: ReactNode, url: string): MenuItem => {
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
      createMenuItem(t('page.home'), <HomeIcon />, appRoutes.home.root),
      createMenuItem(t('page.nodes'), <CubeIcon />, appRoutes.nodes.root)
    ];
  }, [t, createMenuItem]);

  return (
    <SideMenuContainer>
      <nav>
        <FlexColumnWithRowGap>
          <img src={logoCarbonCrowd} alt="Carbon Crowd" />
          <StyledMenu model={menuItems} />
        </FlexColumnWithRowGap>
      </nav>
    </SideMenuContainer>
  );
};

export default SideMenu;
