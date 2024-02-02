import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import type { FC, ReactNode } from 'react';
import type { MenuItem } from 'primereact/menuitem';

import { appRoutes } from '@/router/app-routes';
import HomeIcon from '@/theme/assets/icons/home';
import NetworkIcon from '@/theme/assets/icons/network';
import InfoCircleIcon from '@/theme/assets/icons/info-circle';
import logoCarbonCrowd from '@/theme/assets/logo-carbon-crowd.svg';
import pogLogo from '@/theme/assets/pog.png';
import {
  FlexColumnWithRowGap,
  NavBar,
  StyledMenu
} from '@/theme/styled-components';

interface SideMenuProps {
  onItemClick?: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ onItemClick }) => {
  const { t } = useTranslation();
  const createMenuItem = useCallback(
    (label: string, icon: ReactNode, url: string): MenuItem => {
      const menuItemTemplate = (item: MenuItem) => (
        <NavLink
          to={item.url ?? ''}
          className="p-menuitem-link"
          onClick={onItemClick}
        >
          <i className="menu-item-icon">{item.icon}</i>
          <span className="p-menuitem-text">{item.label}</span>
        </NavLink>
      );

      return {
        label,
        icon,
        url,
        template: menuItemTemplate
      };
    },
    [onItemClick]
  );
  const menuItems: MenuItem[] = useMemo<MenuItem[]>(() => {
    return [
      createMenuItem(t('page.home'), <HomeIcon />, `${appRoutes.home.root}`),
      createMenuItem(t('Subnets'), <NetworkIcon />, appRoutes.subnets.root),
      createMenuItem(t('page.about'), <InfoCircleIcon />, appRoutes.about.root)
    ];
  }, [t, createMenuItem]);

  return (
    <NavBar>
      <FlexColumnWithRowGap>
        <img src={logoCarbonCrowd} alt="Carbon Crowd Logo" />
        <StyledMenu model={menuItems} />
        <img src={pogLogo} alt="PoG logo" width="120px" />
      </FlexColumnWithRowGap>
    </NavBar>
  );
};

export default SideMenu;
