import { Principal } from '@dfinity/principal';

import type { Result } from '@/declarations/esg_wallet/esg_wallet.did';

import { idlFactory as nnsLedgerIdlFactory } from '@/declarations/idls/nns_ledger.did';
import { idlFactory as esgWalletIdlFactory, createActor as esgWalletCreateActor } from '@/declarations/esg_wallet';
// import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet/';
import { CandidMapper } from '@/utils/candid-mapper';

const esgWallet = esgWalletCreateActor(
  import.meta.env.CANISTER_ID_ESG_WALLET,
  {
    agentOptions: {
      host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
    }
  }
);

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

  private connectOptions: ConnectionOptionsModel = {};

  constructor() {
    if (window.ic?.plug) {
      this.plug = window.ic.plug;

      const host =
        process.env.DFX_NETWORK === 'local'
          ? 'http://localhost:8080/'
          : import.meta.env.VITE_APP_ICP_NETWORK_HOST;
      this.ledgerCanisterId =
        import.meta.env.VITE_APP_ICP_LEDGER_CANISTER_ID ?? '';
      this.connectOptions = {
        host,
        whitelist: [this.ledgerCanisterId],
        timeout: 50000
      };
    } else {
      // TODO: replace with a more user-friendly message
      alert('Plug extension not detected!');
      return;
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
    console.log('icrc2_approve: ', result);
    if (!CandidMapper.handleResult(result)) {
      throw new Error('Error requesting transfer');
    }
  }

  private async registerPayment(
    canisterId: string,
    amount: number,
    nodeId?: string
  ): Promise<void> {
    const nodeEscrowActor = await this.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: esgWalletIdlFactory
    });

    // check if nodeId is provided
    if (nodeId) {
      const result: String = await esgWallet.registerPayment(
        BigInt(amount),
        [nodeId]
      );
      console.log('registerPaymentWithNodeId: ', result);
      if (!CandidMapper.handleResult(result)) {
        throw new Error('Error registering payment');
      }
      return;
    }

    else {
    const result: Result = await nodeEscrowActor.registerPayment(
      BigInt(amount)
    );
    console.log('registerPayment: ', result);
    if (!CandidMapper.handleResult(result)) {
      throw new Error('Error registering payment');
    }
  }
  }

  private async requestConnect(whitelist: string[] = []): Promise<void> {
    const onConnectionUpdate = () => {
      console.log(this.plug.sessionManager.sessionData);
    };

    await this.plug.requestConnect({
      onConnectionUpdate,
      ...this.connectOptions,
      whitelist: whitelist.concat(this.connectOptions.whitelist ?? [])
    });
  }

  async makePayment(
    escrowPrincipalId: string,
    amount: number,
    totalCost: number
  ): Promise<void> {
    await this.requestConnect([escrowPrincipalId]);
    await this.requestTransfer(escrowPrincipalId, totalCost);
    await this.registerPayment(escrowPrincipalId, amount);
  }
}

const plugWallet = new PlugWalletService();
export { plugWallet };
