import { help, info, primary, warning } from '@/theme/colors';

export type GridTechnologyType = 'NUCLEAR' | 'WIND' | 'SOLAR' | 'HYDRO';

export const gridTechnologyColorMap: Record<GridTechnologyType, string> = {
  HYDRO: info,
  NUCLEAR: help,
  SOLAR: warning,
  WIND: primary
};
