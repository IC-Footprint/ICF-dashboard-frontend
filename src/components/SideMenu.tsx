import { Button } from 'primereact/button';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import type { MenuItem } from 'primereact/menuitem';
import type { FC, ReactNode } from 'react';

// import useSignUp from '@/helpers/state/useSignUp';
import { appRoutes } from '@/router/app-routes';
import CubeIcon from '@/theme/assets/icons/cube';
import HomeIcon from '@/theme/assets/icons/home';
import NetworkIcon from '@/theme/assets/icons/network';
import InfoCircleIcon from '@/theme/assets/icons/info-circle';
import CryptoLogo from '@/theme/assets/icons/crypto';

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

const LANGUAGES = [
  'en_GB',
  'es_ES',
  'de_DE',
  'ja_JP',
  'fr_FR',
  'pt_PT',
  'ru_RU',
  'tr_TR',
  'vi_VN',
  'zh_CN'
];

const SideMenu: FC<SideMenuProps> = ({ onItemClick }) => {
  const { t, i18n } = useTranslation();
  // const {
  // actions: { showSignUpModal }
  // } = useSignUp();
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
      createMenuItem(t('page.nodes'), <CubeIcon />, appRoutes.nodes.root),
      createMenuItem(t('page.crypto'), <CryptoLogo />, appRoutes.crypto.root),
      createMenuItem(
        t('page.subnets'),
        <NetworkIcon />,
        appRoutes.subnets.root
      ),
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
      <Button
        label={t('signUp.title').toString()}
        onClick={() => {
          onItemClick?.();
          // showSignUpModal();
          window.open('https://mwu3nbiuwdv.typeform.com/to/KH3RJJXS', '_blank');
        }}
        style={{ maxWidth: 200 }}
      />
      <select onChange={(event) => i18n.changeLanguage(event.target.value)}>
        {LANGUAGES.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </select>
    </NavBar>
  );
};

export default SideMenu;
