import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Timeline } from 'react-twitter-widgets';

import type { EntityModel } from '@/models/about/entity-model';
import type { TwitterWidgetOptionsModel } from '@/models/about/twitter-widget-options-model';
import type { FC } from 'react';

import InformationCard from '@/components/InformationCard';
import SignUp from '@/components/sign-up/SignUp';
import { createEntity } from '@/models/about/entity-model';
import analytics from '@/theme/assets/analytics.svg';
import chart from '@/theme/assets/chart.svg';
import check from '@/theme/assets/check.svg';
import icpExplorerLogo from '@/theme/assets/icp-explorer-logo.png';
import logoCarbonCrowd from '@/theme/assets/logo-carbon-crowd.svg';
import presentTechnologiesLogo from '@/theme/assets/present-technologies-logo.png';
import singularityLogo from '@/theme/assets/singularity-logo.png';
import {
  AboutAcknowledgementsCardContainer,
  AboutContainer,
  AboutContentContainer,
  AboutContextContainer,
  AboutLogosContainer,
  AboutProviderContainer,
  AboutTitle,
  FlexColumnCard,
  FlexColumnContainer,
  FlexRowCard
} from '@/theme/styled-components';
import { TwitterWidgetUtils } from '@/utils/twitter-widget-utils';

const About: FC = () => {
  const { t } = useTranslation();
  const twitterWidgetOptions: TwitterWidgetOptionsModel = useMemo(() => {
    return TwitterWidgetUtils.buildTwitterWidgetOptions();
  }, []);
  const acknowledgmentEntities: EntityModel[] = useMemo(() => {
    return [
      createEntity(
        'Present Technologies',
        presentTechnologiesLogo,
        'https://www.present-technologies.com'
      ),
      createEntity('Singularity', singularityLogo),
      createEntity(
        'ICP Explorer',
        icpExplorerLogo,
        'https://www.icpexplorer.org'
      )
    ];
  }, []);

  return (
    <AboutContainer>
      <AboutContentContainer className="grid">
        <AboutContextContainer className="col-12">
          <AboutTitle>{t('about.title')}</AboutTitle>
          <h1 className="text-color">{t('about.subtitle')}</h1>
          <AboutProviderContainer>
            <h4 className="uppercase">{t('about.poweredBy')}</h4>
            <img
              src={logoCarbonCrowd}
              alt="Carbon Crowd Logo"
              className="w-14rem"
            />
            <span className="text-primary">
              {t('about.realTimeCarbonAnalytics')}
            </span>
          </AboutProviderContainer>
        </AboutContextContainer>
        <div className="col-12 lg:col-4">
          <InformationCard
            image={analytics}
            title={t('about.features.transparency.title')}
            content={t('about.features.transparency.description')}
          />
        </div>
        <div className="col-12 lg:col-4">
          <InformationCard
            image={chart}
            title={t('about.features.costSavings.title')}
            content={t('about.features.costSavings.description')}
          />
        </div>
        <div className="col-12 lg:col-4">
          <InformationCard
            image={check}
            title={t('about.features.regulationCompliance.title')}
            content={t('about.features.regulationCompliance.description')}
          />
        </div>
        <div className="col-12">
          <FlexColumnCard>
            <h4>{t('about.vision.title')}</h4>
            <p>{t('about.vision.description')}</p>
          </FlexColumnCard>
        </div>
        <div className="col-12">
          <FlexRowCard>
            <div className="grid m-0 w-full">
              <div className="col-12 lg:col-6">
                <Timeline
                  dataSource={twitterWidgetOptions.dataSource}
                  options={twitterWidgetOptions.options}
                  renderError={() => {
                    return <p>{t('about.followUs.twitterTimelineError')}</p>;
                  }}
                />
              </div>
              <FlexColumnContainer className={'col-12 lg:col-6'}>
                <FlexColumnContainer className="p-0 flex-grow-0">
                  <h4>{t('about.followUs.title')}</h4>
                  <p>{t('about.followUs.twitter')}</p>
                </FlexColumnContainer>
                <SignUp showCancel={false} showClose={false} />
              </FlexColumnContainer>
            </div>
          </FlexRowCard>
        </div>
        <div className="col-12">
          <AboutAcknowledgementsCardContainer>
            <h4>{t('about.acknowledgements')}</h4>
            <AboutLogosContainer>
              {acknowledgmentEntities.map((entity: EntityModel) =>
                entity.link ? (
                  <a
                    key={entity.name}
                    href={entity.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={entity.image} alt={entity.name} />
                  </a>
                ) : (
                  <img key={entity.name} src={entity.image} alt={entity.name} />
                )
              )}
            </AboutLogosContainer>
          </AboutAcknowledgementsCardContainer>
        </div>
      </AboutContentContainer>
    </AboutContainer>
  );
};

export default About;
