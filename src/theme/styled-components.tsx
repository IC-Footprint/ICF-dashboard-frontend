import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Chip } from 'primereact/chip';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { ProgressBar } from 'primereact/progressbar';
import { SelectButton } from 'primereact/selectbutton';
import { Sidebar } from 'primereact/sidebar';
import { Tag } from 'primereact/tag';

import type { ViewportOptionsProps } from '@/models/viewport-options-props';
import type { ColoredChipProps } from '@/models/nodes/colored-chip-props';
import type { DialogSizeProps } from '@/models/dialog-size-props';

import { transientOptions } from '@/theme/styled-components-utils';
import {
  globeTooltipBackgroundColor,
  primary,
  primaryLight,
  gridCardBackground
} from '@/theme/colors';
import aboutBackgroundImage from '@/theme/assets/about-background.svg';

export const LabelStyle = css`
  color: var(--text-color-secondary);
  font-weight: normal;
  font-size: 0.75rem;
`;

export const FlexColumnStyle = css`
  display: flex;
  flex-direction: column;
`;

export const FlexColumnWithRowGap = styled.div`
  ${FlexColumnStyle};
  row-gap: 1.5rem;
`;

export const FlexColumnContainer = styled(FlexColumnWithRowGap)`
  ${FlexColumnStyle};
  flex-grow: 1;
  padding: 1.75rem;
`;

export const FlexRowContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const StyledCard = styled(Card)`
  color: var(--text-color-primary);
  border-radius: 1rem;
`;

export const FlexColumnCard = styled(StyledCard)`
  .p-card-content {
    ${FlexColumnStyle};
    row-gap: 0.875rem;
    padding: 0;
  }
`;

export const FlexRowCard = styled(StyledCard)`
  .p-card-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    column-gap: 1.375rem;
  }
`;

export const AboutAcknowledgementsCardContainer = styled(StyledCard)`
  .p-card-content {
    ${FlexColumnStyle};
    align-items: center;
    row-gap: 0.875rem;
    padding: 0;
  }
`;

export const SelectTimeRangeContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 0.5rem;
`;

export const StyledSelectButton = styled(SelectButton)`
  display: flex;
  max-width: 100%;
  padding: 0.25rem;
  overflow-x: auto;

  .p-button {
    display: flex;
    justify-content: center;
  }
`;

export const PageContent = styled.main<ViewportOptionsProps>`
  ${FlexColumnStyle};
  position: absolute;
  top: ${({ $isMobile }) => ($isMobile ? '4rem' : 0)};
  right: 0;
  bottom: 0;
  left: ${({ $isMobile }) => ($isMobile ? '0' : '13.75rem')};
  overflow: auto;

  h3 {
    margin: 0;
  }
`;

export const StyledChart = styled(
  Chart,
  transientOptions
)<ViewportOptionsProps>`
  flex: 1;
  min-height: ${({ $isMobile }) => ($isMobile ? '25rem' : '18.75rem')};

  canvas {
    position: absolute;
  }
`;

export const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
  height: 6px;
`;

export const GridTechnologiesContainer = styled.div`
  display: flex;
  min-height: 1.875rem;
  column-gap: 0.5rem;
`;

export const ColoredChip = styled(Chip, transientOptions)<ColoredChipProps>`
  padding: 0.125rem 0.5rem;
  color: ${({ $color }) => $color};
  background-color: unset;
  border: solid 1px ${({ $color }) => $color};

  .p-chip-text {
    margin: 0;
  }
`;

export const PaginatorStyle = css`
  justify-content: end;
  padding: 1rem;
`;

export const RootContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const NavBar = styled.nav`
  ${FlexColumnStyle};
  top: 0;
  left: 0;
  z-index: 1000;
  justify-content: space-between;
  min-width: 14rem;
  height: 100%;
  padding: 1.125rem 0.625rem;
  overflow: hidden;
  background-color: var(--surface-ground);
`;

export const SideMenuContainer = styled.div`
  position: fixed;
  height: 100vh;
`;

export const StyledMenu = styled(Menu)`
  width: 100%;

  .menu-item-icon {
    height: 1rem;
    margin-right: 0.5rem;
  }

  .p-menuitem a.p-menuitem-link.active {
    &,
    &:hover {
      background-color: ${gridCardBackground};
    }
  }
`;

export const FeaturesInformationCard = styled(Card)`
  background-color: ${gridCardBackground};

  .p-card-content {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 0.5rem;
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

export const DashboardContentContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 0.875rem;
  width: 100%;
  height: 100%;
  min-height: 25rem;
`;

export const WorldContainer = styled.div`
  position: relative;
  height: 100%;
  margin-right: -1rem;
`;

export const GlobeContainer = styled.div`
  position: absolute;

  canvas {
    border-radius: 0.375rem;
  }

  .scene-tooltip > .tooltip-container {
    ${FlexColumnStyle};
    align-items: center;
    row-gap: 1rem;
    padding: 1rem;
    font-family: Inter, sans-serif;
    background-color: ${globeTooltipBackgroundColor};
    border-radius: 0.375rem;

    h5 {
      font-weight: 700;
      font-size: 1.125rem;
      line-height: 1.3125rem;
    }

    span {
      color: var(--primary-color);
      white-space: nowrap;
      text-align: end;
    }
  }
`;

export const DashboardTable = styled(DataTable)`
  .p-datatable-table tr {
    & > td {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    & > th {
      font-weight: 700;
      font-size: 0.75rem;
    }
  }
`;

export const HeadlessDashboardTable = styled(DashboardTable)`
  &.p-datatable,
  &.p-datatable-scrollable {
    table thead {
      display: none;
    }
  }
`;

export const TableContainerCard = styled(FlexColumnCard)`
  &.p-card {
    position: relative;
    height: 100%;

    .p-card-body {
      height: 100%;

      .p-card-content {
        height: 100%;

        .p-datatable-flex-scrollable {
          height: 100%;
        }
      }
    }
  }
`;

export const TableCardContainer = styled.div`
  flex-shrink: 1;
  min-height: 10rem;
  margin-right: -1rem;
  padding: 0.5rem;
`;

export const DashboardRightPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
`;

export const StyledTable = styled(DashboardTable)`
  .p-datatable-wrapper {
    overflow-x: auto;

    table {
      th {
        white-space: nowrap;
      }

      td {
        max-width: 10rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const StyledInputText = styled(InputText)`
  width: 100%;
`;

export const Form = styled.form`
  margin-top: 0.5rem;
  row-gap: 1rem;
`;

export const SignUpContainer = styled.div`
  ${FlexColumnStyle};
  row-gap: 1.75rem;
  padding-top: 2rem;
`;

export const SignUpMessage = styled.p`
  white-space: pre-line;
`;

export const FooterButtonsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  padding-bottom: 0;
  column-gap: 0.5rem;
`;

export const StyledSidebar = styled(Sidebar)`
  border-top: 0;
  border-bottom: 0;
  border-left: 0;

  .p-sidebar-header {
    display: none;
  }

  .p-sidebar-content {
    padding: 0;
  }
`;

export const TopNavBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  padding: 1rem 1.5rem;
  background-color: var(--surface-overlay);
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.5);
`;

export const StyledDialog = styled(Dialog, transientOptions)<DialogSizeProps>`
  max-width: ${({ $size, $isMobile }) =>
    $size === 'small' && !$isMobile ? '50vw' : '95vw'};
`;

export const AboutContainer = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0;
  padding: 1.875rem;
  overflow: auto;
  /* background-image: url(${aboutBackgroundImage}); */
  background-size: cover;

  p {
    white-space: pre-line;
  }
`;

export const AboutContentContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 1rem;
`;

export const AboutContextContainer = styled(FlexColumnContainer)`
  align-items: center;
  row-gap: 2rem;
  margin: 5rem 0;
  text-align: center;
`;

export const AboutProviderContainer = styled(FlexColumnContainer)`
  row-gap: 1rem;
  align-items: center;
  padding: 0;
`;

export const AboutTitle = styled.h1`
  font-weight: 400;
  font-size: 2.8125rem;
  line-height: 2.3125rem;
`;

export const InformationCardContainer = styled(FlexColumnCard)`
  height: 100%;
  padding: 1.5rem 0;
`;

export const AboutLogosContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1.75rem;
  row-gap: 2rem;
  column-gap: 4rem;

  img {
    width: 6.25rem;
  }
`;

export const LightTag = styled(Tag)`
  padding: 0.5rem 1rem;
  color: ${primary};
  background: ${primaryLight};

  p {
    font-size: 0.875rem;
  }
`;
