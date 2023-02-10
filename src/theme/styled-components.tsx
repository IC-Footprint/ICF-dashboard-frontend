import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Chip } from 'primereact/chip';
import { Menu } from 'primereact/menu';
import { ProgressBar } from 'primereact/progressbar';

import type { ColoredChipProps } from '@/models/nodes/colored-chip-props';

export const FlexColumnStyle = css`
  display: flex;
  flex-direction: column;
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
  padding: 1.75rem;
  row-gap: 1.75rem;

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

export const NodesContainer = styled.div`
  ${FlexColumnStyle};
  row-gap: 1.75rem;
`;

export const LayoutContainer = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
`;

export const SideMenuContainer = styled.nav`
  ${FlexColumnStyle};
  padding: 1.125rem 0.625rem;
  row-gap: 1.5rem;
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
