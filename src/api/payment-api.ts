import type { Result_1 } from '@/declarations/escrow_manager/escrow_manager.did';
import type { _SERVICE as NodeEscrowIdl } from '@/declarations/node_escrow/node_escrow.did';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { PaymentDataModel } from '@/models/payment/payment-data-model';
import type { ActorSubclass } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

import { plugWallet } from '@/services/plug-service';
import { PaymentMappers } from '@/state/payment/payment-mappers';
import { createActor as nodeEscrowCreateActor } from '@/declarations/node_escrow';
import { createActor as icLedgerCreateActor } from '@/declarations/icrc1_ledger_canister';
import { escrow_manager } from '@/declarations/escrow_manager';
import { CandidMapper } from '@/utils/candid-mapper';

export class PaymentApi {
  async getNodeEscrowPrincipal(nodeId: string): Promise<Principal | null> {
    const nodeEscrowResult: Result_1 = await escrow_manager.getNodeEscrow(
      nodeId
    );
    const nodeEscrowPrincipal = CandidMapper.handleResult1(nodeEscrowResult);
    if (!nodeEscrowPrincipal) {
      throw new Error('Node escrow not found');
    }
    return nodeEscrowPrincipal;
  }

  async getNodeEscrowActor(
    nodeId: string
  ): Promise<ActorSubclass<NodeEscrowIdl>> {
    const nodeEscrowResult: Result_1 = await escrow_manager.getNodeEscrow(
      nodeId
    );
    const nodeEscrowPrincipal = CandidMapper.handleResult1(nodeEscrowResult);
    if (!nodeEscrowPrincipal) {
      console.warn('Node escrow not found');
      throw new Error('Node escrow not found');
    }
    return nodeEscrowCreateActor(nodeEscrowPrincipal);
  }

  async calculateCost(paymentData: PaymentDataModel): Promise<number> {
    const nodeEscrow = await this.getNodeEscrowActor(paymentData.nodeId);
    const icLedgerActor = icLedgerCreateActor(
      import.meta.env.VITE_APP_ICP_LEDGER_CANISTER_ID ?? '',
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );
    const icrc1Decimals = await icLedgerActor.icrc1_decimals();
    const result = await nodeEscrow.getPrice(
      BigInt(paymentData.carbonDebitAmount)
    );
    return Number(result) * Math.pow(10, -icrc1Decimals);
  }

  async getPurchases(nodeId: string): Promise<CanisterAttributionModel[]> {
    const nodeEscrow = await this.getNodeEscrowActor(nodeId);
    const result = await nodeEscrow.getPurchases();
    return result.map(PaymentMappers.mapPurchase);
  }

  async registerPayment(paymentData: PaymentDataModel): Promise<boolean> {
    const nodeEscrowPrincipal = await this.getNodeEscrowPrincipal(
      paymentData.nodeId
    );
    if (!nodeEscrowPrincipal || !paymentData.totalCost) {
      return false;
    }

    await plugWallet.makePayment(
      nodeEscrowPrincipal.toText(),
      paymentData.carbonDebitAmount,
      paymentData.totalCost
    );
    return true;
  }
}

const paymentApi = new PaymentApi();
export default paymentApi;
