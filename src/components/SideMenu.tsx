import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import type { MenuItem } from 'primereact/menuitem';
import type { FC, ReactNode } from 'react';

import { appRoutes } from '@/router/app-routes';
import icFootprintTextLogo from '@/theme/assets/ic-footprint-text-logo.svg';
import HomeIcon from '@/theme/assets/icons/home';
import InfoCircleIcon from '@/theme/assets/icons/info-circle';
import NetworkIcon from '@/theme/assets/icons/network';
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
      createMenuItem(
        t('page.home'),
        <HomeIcon />,
        `${appRoutes.dashboard.root}`
      ),
      createMenuItem(
        t('page.network'),
        <NetworkIcon />,
        appRoutes.network.root
      ),
      createMenuItem(
        t('page.whitePaper'),
        <InfoCircleIcon />,
        appRoutes.whitePaper.root
      ),
      createMenuItem(
        t('page.LegalDesclaimer'),
        <InfoCircleIcon />,
        appRoutes.legalDisclaimer.root
      )
    ];
  }, [t, createMenuItem]);

  return (
    <NavBar>
      <FlexColumnWithRowGap>
        <Link to={appRoutes.dashboard.root}>
          <img src={icFootprintTextLogo} alt="Carbon Crowd Logo" />
        </Link>
        <StyledMenu model={menuItems} />
      </FlexColumnWithRowGap>
    </NavBar>
  );
};

export default SideMenu;
