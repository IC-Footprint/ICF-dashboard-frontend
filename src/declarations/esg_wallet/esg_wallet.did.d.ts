import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Client { 'name' : string, 'node_ids' : Array<string> }
export interface Conf { 'ledger_canister_id' : Principal }
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface Payment {
  'ticket_price' : bigint,
  'payer' : string,
  'block_height' : bigint,
  'ticket_count' : bigint,
  'contribution_id' : string,
}
export type Result = { 'Ok' : Payment } |
  { 'Err' : string };
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface _SERVICE {
  'authorize' : ActorMethod<[Principal], undefined>,
  'deauthorize' : ActorMethod<[Principal], undefined>,
  'getPrice' : ActorMethod<[bigint], bigint>,
  'getPurchases' : ActorMethod<[], Array<Payment>>,
  'getTicketPrice' : ActorMethod<[], bigint>,
  'get_contribution_by_entity' : ActorMethod<[string], string>,
  'get_contribution_by_id' : ActorMethod<[string], string>,
  'get_contributions' : ActorMethod<[], string>,
  'registerPayment' : ActorMethod<[bigint], string>,
  'send' : ActorMethod<[string, bigint], string>,
  'setOffsetEmissions' : ActorMethod<[], string>,
  'set_api_key' : ActorMethod<[string], undefined>,
}
