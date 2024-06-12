import { css } from '@emotion/css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataView } from 'primereact/dataview';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/24/outline';

import Modal from 'styled-react-modal';

import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';

import {
  ModalContainer,
  ModalSectionTitle,
  CardContainerWithBackground,
  CardContainer,
  AccountsSectionButton,
  Socials,
  AddNewItemCard,
  AddNewItemIcon
} from './StyledComponents';

import GridItem from './GridItem';

import type React from 'react';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import type { Dispatch, FC, SetStateAction } from 'react';

import type { ProjectModel } from '@/models/dashboard/project-model';

import useDashboard from '@/helpers/state/useDashboard';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import {
  PaginatorStyle,
  StyledTable
} from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

import icpLogo from '/images/icp-logo.png';
import AZURE from '/images/Azure.png';
import AWS from '/images/AWS.png';
import GCP from '/images/GCP.png';
import githubLogo from '/images/github-logo.png';

import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';

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

  interface ModalFormProps {
    organizationType?: AccountDataType;
    onClose: () => void;
  }

  const ModalForm: React.FC<ModalFormProps> = ({ onClose }) => {
    const [step, setStep] = useState<number>(1);
    const lastStep = 4;
    const [organizationName, setOrganizationName] = useState<string>('');
    const [organizationLogo, setOrganizationLogo] = useState<string>('');
    const [subnetIds, setSubnetIds] = useState<string[]>([]);

    const handleSubmit = async () => {
      try {
        const project: ProjectModel = {
          id: subnetIds,
          name: organizationName,
          icon: organizationLogo || ''
        };
        const nodeManagerActor = nodeManagerCreateActor(
          process.env.CANISTER_ID_NODE_MANAGER ?? '',
          {
            agentOptions: {
              host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
            }
          }
        );

        await nodeManagerActor.add_project({
          ...project,
          icon: [organizationLogo] || ['']
        });
        onClose();
      } catch (error) {
        console.error('Error adding project:', error);
      }
    };

    const handleAddSubnetId = () => {
      setSubnetIds([...subnetIds, '']);
    };

    const handleSubnetIdChange = (index: number, value: string) => {
      const newSubnetId = [...subnetIds];
      newSubnetId[index] = value;
      setSubnetIds(newSubnetId);
    };

    const handleIncreaseStep = (subnetId?: string) => {
      if (step === 2) {
        handleSubmit();
      }
      if (subnetId) {
        setSubnetIds((prev) => [...prev, subnetId]);
      }
      setStep((prev) => (prev < lastStep ? prev + 1 : prev));
    };

    return (
      <div>
        <ModalStep
          step={step}
          onClose={onClose}
          increaseStep={handleIncreaseStep}
          decreaseStep={() => setStep((prev) => (prev == 0 ? prev : prev - 1))}
          organizationName={organizationName}
          setOrganizationName={setOrganizationName}
          organizationLogo={organizationLogo}
          setOrganizationLogo={setOrganizationLogo}
          subnetId={subnetIds}
          onAddSubnetId={handleAddSubnetId}
          onSubnetIdChange={handleSubnetIdChange}
          setSubnetIds={setSubnetIds}
        />
      </div>
    );
  };

  interface ModalStepProps {
    step: number;
    increaseStep: (subnetId?: string) => void;
    decreaseStep: () => void;
    onClose: () => void;
    organizationName: string;
    setOrganizationName: Dispatch<SetStateAction<string>>;
    organizationLogo: string;
    setOrganizationLogo: Dispatch<SetStateAction<string>>;
    subnetId: string[];
    onAddSubnetId: () => void;
    onSubnetIdChange: (index: number, value: string) => void;
    setSubnetIds: Dispatch<SetStateAction<string[]>>;
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
    onClose,
    subnetId,
    setOrganizationName,
    onAddSubnetId,
    // onSubnetIdChange,
    setSubnetIds
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
              <InputText
                placeholder="Subnet ID"
                value={subnetId[0]}
                onChange={(e) => setSubnetIds(() => [e.target.value])}
                // onChange={(e) => onSubnetIdChange(Number(e.target.value), '')} // Fix: Convert the string value to a number
              />
              <Button
                link
                label="Add another Subnet ID"
                onClick={onAddSubnetId}
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
            <Button onClick={() => increaseStep(subnetId[0])} label="Proceed" />
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
            `To enable cycles measurement we need to enable a blackhole canister
            to connect with each of your canisters. The blackhole gives us no
            control or insight into your canister operations, it only enables us
            to read the canister burn rate. To connect, run this command on your
            terminal, separating each Canister ID with a space character.`
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

          <Button onClick={() => increaseStep('')} label="Proceed" />
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
            <Button onClick={() => increaseStep('')} label="Connect Wallet" />
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
          <InputText
            onChange={(event) => setOrganizationName(event.target.value)}
          />
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
          <Button onClick={() => increaseStep('')} label="Proceed" />
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
     return <GridItem account={account} dataType={dataType} parentRoute={parentRoute} />;
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
