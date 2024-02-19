import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Conf {
  node_id: string;
  ticket_price: bigint;
  ledger_canister_id: Principal;
}

export interface HttpHeader {
  value: string;
  name: string;
}

export interface HttpResponse {
  status: bigint;
  body: Uint8Array | number[];
  headers: Array<HttpHeader>;
}

export interface Payment {
  ticket_price: bigint;
  payer: string;
  block_height: bigint;
  ticket_count: bigint;
}

export type Result = { Ok: bigint } | { Err: string };

export interface TransformArgs {
  context: Uint8Array | number[];
  response: HttpResponse;
}

export interface _SERVICE {
  getPrice: ActorMethod<[bigint], bigint>;
  getPurchases: ActorMethod<[], Array<Payment>>;
  getTicketPrice: ActorMethod<[], bigint>;
  registerPayment: ActorMethod<[bigint], Result>;
  send: ActorMethod<[string, bigint], string>;
  transform: ActorMethod<[TransformArgs], HttpResponse>;
}

export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
