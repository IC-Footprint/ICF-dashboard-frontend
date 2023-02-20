import { Button } from 'primereact/button';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import type { MenuItem } from 'primereact/menuitem';
import type { FC, ReactNode } from 'react';

import useSignUp from '@/helpers/state/useSignUp';
import logoCarbonCrowd from '@/theme/assets/logo-carbon-crowd.svg';
import CubeIcon from '@/theme/assets/icons/cube';
import HomeIcon from '@/theme/assets/icons/home';
import { appRoutes } from '@/router/app-routes';
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
  const {
    actions: { showSignUpModal }
  } = useSignUp();
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
      createMenuItem(t('page.home'), <HomeIcon />, appRoutes.home.root),
      createMenuItem(t('page.nodes'), <CubeIcon />, appRoutes.nodes.root)
    ];
  }, [t, createMenuItem]);

  return (
    <NavBar>
      <FlexColumnWithRowGap>
        <img src={logoCarbonCrowd} alt="Carbon Crowd" />
        <StyledMenu model={menuItems} />
      </FlexColumnWithRowGap>
      <Button
        label={t('signUp.title').toString()}
        onClick={() => {
          onItemClick?.();
          showSignUpModal();
        }}
      />
    </NavBar>
  );
};

export default SideMenu;
