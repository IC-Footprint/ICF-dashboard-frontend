import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataView } from 'primereact/dataview';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/24/outline';

import Modal from 'styled-react-modal';

import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';

import type React from 'react';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import type { FC } from 'react';

import TrendValue from '@/components/dashboard/TrendValue';
import NodeStatus from '@/components/nodes/NodeStatus';
import useDashboard from '@/helpers/state/useDashboard';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import { gridCardBackground } from '@/theme/colors';
import {
  FlexRowCard,
  FlexRowContainer,
  LabelStyle,
  PaginatorStyle,
  StyledTable
} from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

import icpLogo from '/images/icp-logo.png';
import AZURE from '/images/Azure.png';
import AWS from '/images/AWS.png';
import GCP from '/images/GCP.png';
import githubLogo from '/images/github-logo.png';

import icBackground from '@/theme/assets/ic-background.png';

export type AccountDataType = 'nodes' | 'nodeProviders' | 'projects';
interface AddNewItem {
  __typename: 'AddNewItem';
  title: string;
  organizationType?: AccountDataType;
}

export interface AccountsDataViewProps {
  list: [AddNewItem, ...CarbonAccountModel[]] | CarbonAccountModel[] | null;
  isLoading?: boolean;
  parentRoute?: string;
  dataType?: AccountDataType;
}

const AccountCard = styled(Card)`
  background-color: ${gridCardBackground};

  .p-card-content {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 0.5rem;
  }
`;

const AddNewItemCard = styled(Card)`
  background-color: rgb(255 255 255 / 0.04);
  height: 100%;
  border: 2px dotted rgb(255 255 255 / 0.2);
  color: #86e7d4;
  font-weight: bold;

  .p-card-body {
    height: 100%;
  }

  .p-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
  }
`;

const AddNewItemIcon = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 8px;
  border: 1px solid #86e7d4;
`;

export const InformationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  h4 {
    ${LabelStyle};
  }

  p {
    font-weight: bold;
  }
`;

const OperatorIcon = styled.img`
  flex-grow: 1;
  max-height: 2rem;
  max-width: 4rem;
`;

export const ModalContainer = styled.div`
  width: 720px;
  height: 96vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: #141f31;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  padding: 32px;
  position: relative;
`;

export const ModalSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: normal;
`;

export const Socials = styled.div`
  display: flex;
  justify-content: 'space-between';
  align-items: center;
  gap: 24px;
`;

export const AccountsSectionButton = styled.button`
  padding: 8px;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background-color: #353e4d;
  border: none;

  img {
    width: 20px;
    height: 20px;
  }
`;
const CardContainer = styled(FlexRowCard)`
  height: 100%;
  .p-card-body {
    height: 100%;

    .p-card-content {
      height: 100%;
      justify-content: space-between;
    }
  }
`;
const CardContainerWithBackground = styled(FlexRowCard)`
  height: 100%;
  background-image: url(${icBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .p-card-body {
    height: 100%;

    .p-card-content {
      height: 100%;
    }
  }
`;

const AccountsDataView: FC<AccountsDataViewProps> = ({
  list,
  isLoading,
  parentRoute,
  dataType
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dataLayout } = useDashboard();
  const paginatorOptions = useMemo(() => {
    return defaultPaginatorOptions();
  }, []);

  const gridItem = (account: CarbonAccountModel) => {
    const header =
      dataType === 'nodes' ? t('table.headers.id') : t('table.headers.name');
    const identificationField =
      dataType === 'nodes' ? account.id : account.operator?.name;

    return (
      <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2" key={account.id}>
        <AccountCard>
          <FlexRowContainer className="justify-content-between">
            <div className="flex-grow-1">
              <OperatorIcon
                src={account.operator?.icon}
                alt={identificationField}
              />
            </div>
            <InformationItemContainer className="flex-1">
              <h4>{header}</h4>
              <p
                title={identificationField}
                className="font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis"
              >
                {identificationField}
              </p>
            </InformationItemContainer>
          </FlexRowContainer>
          <InformationItemContainer>
            <h4>{t('dashboard.carbonAccounts.carbonDebits')}</h4>
            <p>
              <span className="text-xl font-bold">
                {NumberUtils.formatNumber(account.carbonDebit)}
              </span>
              <span className="font-normal">
                {t('common.unit.co2Kg', {
                  value: ''
                })}
              </span>
            </p>
          </InformationItemContainer>
          <FlexRowContainer>
            <InformationItemContainer className="min-w-min">
              <h4>
                {t('common.unit.kgPerWeek', {
                  value: ''
                })}
              </h4>
              <TrendValue
                differenceValue={account.weeklyEmissions}
                size="small"
                iconAlignment={'right'}
              />
            </InformationItemContainer>
            <InformationItemContainer className="ml-2">
              <h4>{t('common.status')}</h4>
              <NodeStatus status={account.status} />
            </InformationItemContainer>
            <div className="flex flex-1 justify-content-end">
              <Link to={`${parentRoute}/${account.id}`}>
                <Button
                  label={t('common.seeMore') ?? ''}
                  severity="secondary"
                  size="small"
                  className="white-space-nowrap"
                />
              </Link>
            </div>
          </FlexRowContainer>
        </AccountCard>
      </div>
    );
  };

  interface ModalFormProps {
    organizationType?: AccountDataType;
    onClose: () => void;
  }

  const ModalForm: React.FC<ModalFormProps> = ({ onClose }) => {
    const [step, setStep] = useState<number>(1);
    const lastStep = 4;

    return (
      <div>
        <ModalStep
          step={step}
          onClose={onClose}
          increaseStep={() =>
            setStep((prev) => (prev < lastStep ? prev + 1 : prev))
          }
          decreaseStep={() => setStep((prev) => (prev == 0 ? prev : prev - 1))}
        />
      </div>
    );
  };

  interface ModalStepProps {
    step: number;
    increaseStep: () => void;
    decreaseStep: () => void;
    onClose: () => void;
  }

  interface ModalContainerParagraph {
    children: React.ReactNode;
  }
  const ModalContainerParagraph: React.FC<ModalContainerParagraph> = ({
    children
  }) => {
    return (
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#ffffff',
          opacity: '.56'
        }}
      >
        {children}
      </p>
    );
  };

  interface ModalContainerHeaderProps {
    title: string;
    description?: string;
  }
  const ModalContainerHeader: React.FC<ModalContainerHeaderProps> = ({
    title,
    description
  }) => {
    return (
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bolder'
          }}
        >
          {title}
        </h2>
        {description && (
          <ModalContainerParagraph>{description}</ModalContainerParagraph>
        )}
      </header>
    );
  };

  const ModalStep: React.FC<ModalStepProps> = ({
    step,
    increaseStep,
    onClose
  }) => {
    if (step === 2) {
      return (
        <ModalContainer>
          <ModalContainerHeader
            title="Add your ID(s)"
            description="Fill in the details below to get started with your EGS wallet creation."
          />
          <div className="flex flex-column flex-grow-1">
            <div className="flex flex-column gap-1 flex-grow-1">
              <ModalSectionTitle>Subnet IDs</ModalSectionTitle>
              <ModalContainerParagraph>
                {`
              If your organisation has a dedicated subnet or subnets, provide
              their IDs below.`}
                <br />
                {`Note: Leave blank if your organisation doesn't
              have a dedicated subnet. Most organisation DO NOT have a dedicated
              subnets.
              `}
              </ModalContainerParagraph>
              <br />
              <InputText placeholder="Subnet ID" />
              <Button
                link
                label="Add another Subnet ID"
                style={{ maxWidth: '240px', textAlign: 'start' }}
              />
            </div>
            <div className="flex flex-column gap-1 flex-grow-1">
              <ModalSectionTitle>Canister IDs</ModalSectionTitle>
              <ModalContainerParagraph>
                {'Enter all your canister IDs here'}
                <br />
                {
                  'Note: If your organisation has a dedicated subnet, and all your canisters are in that subnet, leave this blank...'
                }
              </ModalContainerParagraph>
              <br />
              <InputText placeholder="Canister ID" />
              <Button
                link
                label="Add another Canister ID"
                style={{ maxWidth: '240px', textAlign: 'start' }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              severity="secondary"
              label="Cancel"
              onClick={onClose}
              outlined
            />
            <Button onClick={increaseStep} label="Proceed" />
          </div>
        </ModalContainer>
      );
    }

    if (step === 3) {
      return (
        <ModalContainer>
          <ModalContainerHeader
            title="Enable Cycle Measurement"
            description="Hook up to our analytics"
          />
          <ModalContainerParagraph>
            To enable cycles measurement we need to enable a blackhole canister
            to connect with each of your canisters. The blackhole gives us no
            control or insight into your canister operations, it only enables us
            to read the canister burn rate. To connect, run this command on your
            terminal, separating each Canister ID with a &apos; &apos;.
          </ModalContainerParagraph>

          <div
            style={{
              backgroundColor: 'black',
              padding: '8px 12px',
              overflowX: 'auto',
              borderRadius: '8px'
            }}
          >
            <pre style={{ fontFamily: 'monospace' }}>
              dfx canister --network=ic update-settings --add-controller
              e3mmv-5qaaa-aaaah-aadma-cai [CANISTER_ID] [CANISTER ID] [CANISTER
              ID]
            </pre>
          </div>

          <div className="flex flex-column gap-2 mt-4">
            <ModalContainerParagraph>
              The source code for the blackhole canister used can be found here
            </ModalContainerParagraph>
            <div className="flex flex-row gap-2 align-items-center">
              <img src={githubLogo} alt="Github Logo" width={32} height={32} />
              <a href=" https://github.com/ninegua/ic-blackhole" target="blank">
                <span> https://github.com/ninegua/ic-blackhole</span>
              </a>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              severity="secondary"
              label="Cancel"
              onClick={onClose}
              outlined
            />
            <Button onClick={increaseStep} label="Proceed" />
          </div>
        </ModalContainer>
      );
    }

    if (step === 4) {
      return (
        <ModalContainer>
          <ModalContainerHeader
            title="Make Payment"
            description="Below is the amount of ICP you are to pay"
          />
          <CardContainerWithBackground>
          <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column'
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 'normal'
                  }}
                >
                  ICP Amount
                </h4>
                <p
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold'
                  }}
                >
                  10,000 ICP
                </p>
              </div>
          </CardContainerWithBackground>

          <div className="flex flex-column gap-2 flex-grow-1">
            <CardContainer>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column'
                }}
              >
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Organization Name
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 'normal'
                  }}
                >
                  Carbon Crowd
                </p>
              </div>
              <Button outlined severity="secondary">
                {' '}
                Edit
              </Button>
            </CardContainer>
            <CardContainer>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column'
                }}
              >
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Organization Name
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 'normal'
                  }}
                >
                  Carbon Crowd
                </p>
              </div>
              <Button outlined severity="secondary">
                {' '}
                Edit
              </Button>
            </CardContainer>
            <CardContainer>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column'
                }}
              >
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Organization Name
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 'normal'
                  }}
                >
                  Carbon Crowd
                </p>
              </div>
              <Button outlined severity="secondary">
                {' '}
                Edit
              </Button>
            </CardContainer>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              severity="secondary"
              label="Cancel"
              onClick={onClose}
              outlined
            />
            <Button onClick={increaseStep} label="Connect Wallet" />
          </div>
        </ModalContainer>
      );
    }

    return (
      <ModalContainer>
        <ModalContainerHeader
          title="ESG Wallet Details"
          description="Fill in the details below to get started with your EGS wallet creation."
        />
        <div className="flex flex-column gap-1 flex-grow-1">
          <ModalSectionTitle>Organisation Name</ModalSectionTitle>
          <InputText />
        </div>
        <div>
          <ModalSectionTitle>Logo</ModalSectionTitle>
          <FileUpload mode="basic" auto />
        </div>
        <div>
          <ModalSectionTitle>Select Organization Type</ModalSectionTitle>
          <div className="flex flex-row">
            <div className="flex flex-row gap-4 flex-grow-1">
              <AccountsSectionButton>
                <img src={icpLogo} alt="ICP" width={26} height={26} />
                <span>ICP</span>
              </AccountsSectionButton>
              <AccountsSectionButton>
                <img src={AWS} alt="ICP" width={26} height={26} />
                <span>AWS</span>
              </AccountsSectionButton>
              <AccountsSectionButton>
                <img src={AZURE} alt="ICP" width={26} height={26} />
                <span>Azure</span>
              </AccountsSectionButton>
              <AccountsSectionButton>
                <img src={GCP} alt="ICP" width={26} height={26} />
                <span>GCP</span>
              </AccountsSectionButton>
            </div>
          </div>
        </div>
        <Socials>
          <div className="flex-grow-1 flex flex-column gap-1 px-1">
            <ModalSectionTitle>Organisation Email</ModalSectionTitle>
            <InputText className="width-full" />
          </div>
          <div className="flex-grow-1 flex flex-column gap-1 px-1">
            <ModalSectionTitle>X-Handle link</ModalSectionTitle>
            <InputText />
          </div>
        </Socials>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            severity="secondary"
            label="Cancel"
            onClick={onClose}
            outlined
          />
          <Button onClick={increaseStep} label="Proceed" />
        </div>
      </ModalContainer>
    );
  };

  const AddNewItemComponent = ({ account }: { account: AddNewItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className="col-12 md:col-6 lg:col-4 xl:col-3 p-2"
        key={account.__typename}
      >
        <AddNewItemCard onClick={() => setIsOpen((prev) => !prev)}>
          <AddNewItemIcon>
            <PlusIcon />
          </AddNewItemIcon>
          <p>{account.title}</p>
        </AddNewItemCard>
        <Modal
          isOpen={isOpen}
          onBackgroundClick={() => setIsOpen((prev) => !prev)}
          onEscapeKeydown={() => setIsOpen((prev) => !prev)}
        >
          <ModalForm
            onClose={() => setIsOpen(false)}
            organizationType={account.organizationType}
          />
        </Modal>
      </div>
    );
  };

  const itemTemplate = (
    account: CarbonAccountModel | AddNewItem,
    _layout: 'list' | 'grid' | (string & Record<string, unknown>)
  ) => {
    if (!account) {
      return;
    }
    if ('__typename' in account) {
      return <AddNewItemComponent account={account} />;
    } else {
      return gridItem(account);
    }
  };

  const identificationColumn = useMemo(() => {
    const field = dataType === 'nodes' ? 'id' : 'operator.name';
    const header =
      dataType === 'nodes' ? t('table.headers.id') : t('table.headers.name');

    return <Column field={field} header={header}></Column>;
  }, [dataType, t]);

  return (
    <>
      {dataLayout === 'grid' ? (
        <DataView
          value={list ?? []}
          itemTemplate={itemTemplate}
          paginator
          rows={8}
          paginatorTemplate={paginatorOptions.paginatorTemplate}
          paginatorClassName={css(PaginatorStyle)}
          loading={isLoading}
        />
      ) : (
        <StyledTable
          value={list ?? []}
          paginator
          rows={paginatorOptions.rows}
          rowsPerPageOptions={paginatorOptions.rowsPerPage}
          dataKey="id"
          paginatorClassName={css(PaginatorStyle)}
          paginatorTemplate={paginatorOptions.paginatorTemplate}
          currentPageReportTemplate={t('table.pageReport').toString()}
          loading={isLoading}
          responsiveLayout="scroll"
          selectionMode="single"
          onSelectionChange={(
            e: DataTableSelectionSingleChangeEvent<CarbonAccountModel[]>
          ) => {
            navigate(`${parentRoute}/${e.value.id}`);
          }}
        >
          {identificationColumn}
          <Column
            field="carbonDebits"
            header={`${t('table.headers.carbonDebits')} (${t(
              'common.unit.co2Kg',
              {
                value: ''
              }
            ).trim()})`}
            body={(rowData: CarbonAccountModel) =>
              NumberUtils.formatNumber(rowData.carbonDebit)
            }
          ></Column>
          <Column
            field="weeklyEmissions"
            header={t('common.unit.kgPerWeek', {
              value: ''
            })}
            body={(rowData: CarbonAccountModel) =>
              NumberUtils.formatNumber(rowData.weeklyEmissions)
            }
          ></Column>
          {dataType === 'nodes' ? (
            <Column
              field="operator.name"
              header={t('table.headers.nodeProvider')}
            ></Column>
          ) : null}
          <Column
            field="status"
            header={t('table.headers.status')}
            body={(rowData: CarbonAccountModel) =>
              rowData.status
                ? t(`common.nodeStatus.${rowData.status?.toLowerCase()}`)
                : '-'
            }
          ></Column>
          {dataType === 'nodes' ? (
            <Column
              field="confidence"
              header={t('table.headers.confidence')}
            ></Column>
          ) : null}
          <Column
            field="location"
            header={t('table.headers.location')}
          ></Column>
        </StyledTable>
      )}
    </>
  );
};

export default AccountsDataView;
