import { Principal } from '@dfinity/principal';

// import type { Result } from '@/declarations/esg_wallet/esg_wallet.did';

import { idlFactory as nnsLedgerIdlFactory } from '@/declarations/idls/nns_ledger.did';
import { idlFactory as esgWalletIdlFactory } from '@/declarations/esg_wallet';
// import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet/';
import { CandidMapper } from '@/utils/candid-mapper';

declare global {
  interface Window {
    ic?: {
      plug?: unknown;
    };
  }
}

interface ConnectionOptionsModel {
  whitelist?: string[];
  host?: string;
  timeout?: number;
}

export class PlugWalletService {
  private plug: any;

  private ledgerCanisterId = '';

  private esgWalletCanisterId = '';

  private connectOptions: ConnectionOptionsModel = {};

  constructor() {
    if (window.ic?.plug) {
      this.plug = window.ic.plug;

      const host = import.meta.env.VITE_APP_ICP_NETWORK_HOST;
      this.ledgerCanisterId =
        import.meta.env.VITE_APP_ICP_LEDGER_CANISTER_ID ?? '';
      this.esgWalletCanisterId = process.env.ESG_WALLET_CANISTER_ID ?? '';
      this.connectOptions = {
        host,
        whitelist: [this.ledgerCanisterId, this.esgWalletCanisterId],
        timeout: 50000
      };
      // console.log('Ledger Canister ID: ', this.ledgerCanisterId);
      // console.log('Connect Options: ', this.connectOptions);
    }
  }

  private async requestTransfer(
    canisterId: string,
    amount: number
  ): Promise<void> {
    const nnsActor = await this.plug.createActor({
      canisterId: this.ledgerCanisterId,
      interfaceFactory: nnsLedgerIdlFactory
    });
    // console.log('nnsActor: ', nnsActor);
    const transferFee: BigInt = await nnsActor.icrc1_fee();
    const icrc1Decimals = await nnsActor.icrc1_decimals();
    const totalAmount =
      Number(amount) * Math.pow(10, icrc1Decimals) + Number(transferFee);
    const result = await nnsActor.icrc2_approve({
      amount: BigInt(totalAmount),
      spender: {
        owner: Principal.fromText(canisterId),
        subaccount: []
      },
      fee: [transferFee],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: []
    });
    // console.log('icrc2_approve: ', result);
    if (!CandidMapper.handleResult(result)) {
      throw new Error('Error requesting transfer');
    }
  }

  private async registerPayment(
    canisterId: string,
    amount: number,
    nodeId?: string[]
  ): Promise<void> {
    // console.log('Registering payment');
    const nodeEscrowActor = await this.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: esgWalletIdlFactory
    });

    const nodeIdValue = nodeId !== undefined ? nodeId : [];
    // console.log('amount type: ', typeof amount);
    const resultStr: string = await nodeEscrowActor.registerPayment(
      BigInt(amount),
      nodeIdValue
    );
    console.log('registerPayment: ', resultStr);

    const result = JSON.parse(resultStr);
    if (result.error) {
      console.error('Error registering payment:', result.error);
      throw new Error('Error registering payment');
    }
  }

  private async requestConnect(whitelist: string[] = []): Promise<void> {
    // console.log('Requesting connection');
    const sessiondata = await this.plug.sessionManager.sessionData;
    console.log('session data:', sessiondata);
    const onConnectionUpdate = async () => {
      // console.log('Connection updated');
      const sessiondata = await this.plug.sessionManager.sessionData;
      console.log('session data:', sessiondata);
    };

    // console.log(this.connectOptions);
    // console.log(whitelist);
    try {
      await this.plug.requestConnect({
        onConnectionUpdate,
        ...this.connectOptions,
        whitelist: whitelist.concat(this.connectOptions.whitelist ?? [])
      });
      // console.log('Connected to Plug');
    } catch (error) {
      // console.error('Failed to connect:', error);
    }
  }

  async makePayment(
    escrowPrincipalId: string,
    node_id: string[],
    amount: number,
    totalCost: number
  ): Promise<void> {
    await this.requestConnect([escrowPrincipalId]);
    await this.requestTransfer(escrowPrincipalId, totalCost);
    await this.registerPayment(escrowPrincipalId, amount, node_id);
  }

  isPlugAvailable(): boolean {
    return window.ic?.plug !== undefined;
  }
}

const plugWallet = new PlugWalletService();
export { plugWallet };
