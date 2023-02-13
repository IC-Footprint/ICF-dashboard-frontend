import { interpolateRdYlGn, scaleSequentialSqrt } from 'd3';
import { useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';

import type {
  GlobePointModel,
  GlobePointViewModel
} from '@/models/dashboard/globe-point-model';
import type { FC } from 'react';

import { GlobeContainer } from '@/theme/styled-components';

import useDashboard from '@/helpers/state/useDashboard';
import earthNight from '@/theme/assets/globe/earth-night.jpg';
import earthTopology from '@/theme/assets/globe/earth-topology.png';
import nightSky from '@/theme/assets/globe/night-sky.png';

const World: FC = () => {
  const {
    actions: { getGlobePoints },
    globePoints
  } = useDashboard();
  const globePointsData: GlobePointViewModel[] = useMemo(() => {
    return (
      globePoints?.map(
        (globePoint: GlobePointModel): GlobePointViewModel => ({
          lat: globePoint.coordinates.latitude,
          lng: globePoint.coordinates.longitude,
          size: globePoint.nodeCount * 0.001,
          carbonIntensity: globePoint.carbonIntensity,
          label: globePoint.location
        })
      ) ?? []
    );
  }, [globePoints]);
  const pointColor = scaleSequentialSqrt(interpolateRdYlGn).domain([1, 0]);

  useEffect(() => {
    getGlobePoints();
  }, [getGlobePoints]);

  return (
    <GlobeContainer>
      <Globe
        height={655}
        width={1133}
        globeImageUrl={earthNight}
        bumpImageUrl={earthTopology}
        backgroundImageUrl={nightSky}
        pointsData={globePointsData}
        pointAltitude="size"
        pointColor={(d) => {
          return pointColor((d as GlobePointViewModel).carbonIntensity ?? 0);
        }}
      />
    </GlobeContainer>
  );
};

export default World;
