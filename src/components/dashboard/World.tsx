import { interpolateRdYlGn, scaleSequentialSqrt } from 'd3';
import { useEffect, useMemo, useRef } from 'react';
import Globe from 'react-globe.gl';
import { useTranslation } from 'react-i18next';
import { useResizeDetector } from 'react-resize-detector';

import type { GlobeMethods } from 'react-globe.gl';
import type {
  GlobePointModel,
  GlobePointViewModel
} from '@/models/dashboard/globe-point-model';
import type { FC } from 'react';
import type { GlobeOptionsModel } from '@/models/dashboard/globe-options-model';

import { GlobeUtils } from '@/utils/globe-utils';
import { GlobeContainer, WorldContainer } from '@/theme/styled-components';
import useDashboard from '@/helpers/state/useDashboard';
import earthNight from '@/theme/assets/globe/earth-night.jpg';
import earthTopology from '@/theme/assets/globe/earth-topology.png';
import nightSky from '@/theme/assets/globe/night-sky.png';

const World: FC = () => {
  const globeRef = useRef<GlobeMethods>();
  const { t } = useTranslation();
  const { width, height, ref: worldContainerRef } = useResizeDetector();
  const {
    actions: { getGlobePoints },
    globePoints
  } = useDashboard();
  const globeOptions: GlobeOptionsModel = useMemo(() => {
    return GlobeUtils.buildGlobeOptions();
  }, []);
  const globePointsData: GlobePointViewModel[] = useMemo(() => {
    return (
      globePoints?.map(
        (globePoint: GlobePointModel): GlobePointViewModel => ({
          lat: globePoint.coordinates.latitude,
          lng: globePoint.coordinates.longitude,
          size: globePoint.nodeCount * globeOptions.pointSizeScale,
          carbonIntensity: globePoint.carbonIntensity,
          label: globePoint.location,
          nodesCount: globePoint.nodeCount
        })
      ) ?? []
    );
  }, [globePoints, globeOptions.pointSizeScale]);
  const colorDomain: [number, number] = useMemo(() => {
    if (!globePoints) {
      return [1, 0];
    }
    let minimum = 1;
    let maximum = 0;
    for (const globePoint of globePoints) {
      if (globePoint.carbonIntensity > maximum) {
        maximum = globePoint.carbonIntensity;
      }
      if (globePoint.carbonIntensity < minimum) {
        minimum = globePoint.carbonIntensity;
      }
    }
    return [maximum, minimum];
  }, [globePoints]);
  const pointColor = scaleSequentialSqrt(interpolateRdYlGn).domain(colorDomain);
  const pointLabelTemplate = (d: unknown) => {
    const data = d as GlobePointViewModel;
    return `
      <div class="tooltip-container">
        <h5>${data.label}</h5>
        <span>${t('world.nodes', { value: data.nodesCount })}</span>
        <span>
          ${t('world.carbonIntensity', { value: data.carbonIntensity })}
        </span>
      </div>
    `;
  };

  useEffect(() => {
    getGlobePoints();
  }, [getGlobePoints]);

  return (
    <WorldContainer ref={worldContainerRef}>
      <GlobeContainer>
        <Globe
          ref={globeRef}
          onGlobeReady={() => {
            if (globeRef.current) {
              globeRef.current.pointOfView({
                ...globeRef.current.pointOfView(),
                altitude: globeOptions.pointOfViewAltitude
              });
            }
          }}
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
          pointLabel={pointLabelTemplate}
          pointRadius={globeOptions.pointRadius}
        />
      </GlobeContainer>
    </WorldContainer>
  );
};

export default World;
