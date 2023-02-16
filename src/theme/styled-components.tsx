import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Chip } from 'primereact/chip';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { ProgressBar } from 'primereact/progressbar';

import type { ColoredChipProps } from '@/models/nodes/colored-chip-props';

import { globeTooltipBackgroundColor } from '@/theme/colors';

export const FlexColumnStyle = css`
  display: flex;
  flex-direction: column;
`;

export const FlexColumnWithRowGap = styled.div`
  ${FlexColumnStyle};
  row-gap: 1.75rem;
`;

export const FlexColumnCard = styled(Card)`
  .p-card-content {
    ${FlexColumnStyle};
    row-gap: 0.875rem;
    padding: 0;
  }
`;

export const FlexRowCard = styled(Card)`
  .p-card-content {
    display: flex;
    align-items: center;
    padding: 0;
    column-gap: 1.375rem;
  }
`;

export const SelectTimeRangeContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 0.5rem;
`;

export const PageContent = styled.main`
  ${FlexColumnStyle};
  flex-grow: 1;
  min-width: 0;
  max-width: calc(100vw - 13.75rem);
  padding: 1.75rem;
  row-gap: 1.75rem;
  overflow: auto;

  h3 {
    margin: 0;
  }
`;

export const StyledChart = styled(Chart)`
  flex: 1;
  min-height: 350px;

  canvas {
    position: absolute;
  }
`;

export const TwoColumnsGrid = styled.div`
  display: grid;
  grid-gap: 0.875rem;
  grid-template-columns: 1fr 1fr;
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

export const ColoredChip = styled(Chip)<ColoredChipProps>`
  padding: 0.125rem 0.5rem;
  color: ${(props) => props.color};
  background-color: unset;
  border: solid 1px ${(props) => props.color};

  .p-chip-text {
    margin: 0;
  }
`;

export const PaginatorStyle = css`
  justify-content: end;
  padding: 1rem;
`;

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const SideMenuContainer = styled.div`
  width: 13.75rem;
  max-height: 100vh;

  nav {
    ${FlexColumnStyle};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    justify-content: space-between;
    height: 100%;
    padding: 1.125rem 0.625rem;
    overflow: hidden;
    background-color: var(--surface-ground);
  }
`;

export const StyledMenu = styled(Menu)`
  .menu-item-icon {
    height: 1rem;
    margin-right: 0.5rem;
  }

  .p-menuitem a.p-menuitem-link.active {
    &,
    &:hover {
      & > * {
        color: var(--primary-color);
      }
    }
  }
`;

export const HeadlineFiguresContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
`;

export const HeadlineFigureCardContainer = styled(FlexRowCard)`
  i {
    height: 2rem;
    color: var(--primary-color);
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
`;

export const DashboardTablesSectionContainer = styled.div`
  ${FlexColumnStyle};
  flex-basis: 26rem;
  row-gap: 0.875rem;
`;

export const WorldContainer = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 30rem;
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
    flex-grow: 1;
    flex-shrink: 1;
    min-height: 10rem;

    .p-card-body {
      height: 100%;

      .p-card-content {
        justify-content: center;
        height: 100%;

        .p-datatable-flex-scrollable {
          height: 90%;
        }
      }
    }
  }
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
  row-gap: 0.75rem;
`;

export const SignUpContainer = styled.div`
  ${FlexColumnStyle};
  row-gap: 1.75rem;
  min-width: 20rem;
  padding-top: 2rem;
`;

export const SignUpMessage = styled.p`
  white-space: pre-line;
`;

export const FooterButtonsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  margin-top: 2rem;
  column-gap: 0.5rem;
`;
