import styled from '@emotion/styled';
import { Chart } from 'primereact/chart';

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  row-gap: 0.5rem;
`;

export const SelectTimeRangeContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 0.5rem;
`;

export const PageContent = styled.main`
  padding: 2rem 4rem;
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
  grid-template-columns: 1fr 1fr;
`;
