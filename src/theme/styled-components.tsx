import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Chip } from 'primereact/chip';
import { ProgressBar } from 'primereact/progressbar';

import type { ColoredChipProps } from '@/models/nodes/colored-chip-props';

const FlexColumnStyle = css`
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

export const SelectTimeRangeContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 0.5rem;
`;

export const PageContent = styled.main`
  ${FlexColumnStyle};
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
