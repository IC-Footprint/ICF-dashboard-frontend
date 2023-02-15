import { interpolateRdYlGn, scaleSequentialSqrt } from 'd3';
import { useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useResizeDetector } from 'react-resize-detector';

import type {
  GlobePointModel,
  GlobePointViewModel
} from '@/models/dashboard/globe-point-model';
import type { FC } from 'react';

import { GlobeContainer, WorldContainer } from '@/theme/styled-components';

import useDashboard from '@/helpers/state/useDashboard';
import earthNight from '@/theme/assets/globe/earth-night.jpg';
import earthTopology from '@/theme/assets/globe/earth-topology.png';
import nightSky from '@/theme/assets/globe/night-sky.png';

const World: FC = () => {
  const { width, height, ref: worldContainerRef } = useResizeDetector();
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
  const colorDomainMaximum = useMemo(() => {
    if (globePoints) {
      return globePoints.reduce((previousValue, currentValue) => {
        return currentValue.carbonIntensity > previousValue
          ? currentValue.carbonIntensity
          : previousValue;
      }, 0);
    }
    return 1;
  }, [globePoints]);
  const pointColor = scaleSequentialSqrt(interpolateRdYlGn).domain([
    colorDomainMaximum,
    0
  ]);

  useEffect(() => {
    getGlobePoints();
  }, [getGlobePoints]);

  return (
    <WorldContainer ref={worldContainerRef}>
      <GlobeContainer>
        <Globe
          height={height ?? 0}
          width={width ?? 0}
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
    </WorldContainer>
  );
};

export default World;
