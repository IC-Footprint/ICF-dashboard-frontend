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
  'node_id' : [] | [string],
  'ticket_price' : number,
  'cawa_url' : string,
  'payer' : string,
  'block_height' : bigint,
  'ticket_count' : number,
}
export type Result = { 'Ok' : null } |
  { 'Err' : null };
export type Result_1 = { 'Ok' : Principal } |
  { 'Err' : null };
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface _SERVICE {
  'authorize' : ActorMethod<[Principal], undefined>,
  'deauthorize' : ActorMethod<[Principal], undefined>,
  'getPrice' : ActorMethod<[number], number>,
  'getPurchases' : ActorMethod<[], Array<Payment>>,
  'getPurchasesByNodeId' : ActorMethod<[string], Array<Payment>>,
  'getTicketPrice' : ActorMethod<[], number>,
  'get_contribution_by_entity' : ActorMethod<[string], string>,
  'get_contribution_by_id' : ActorMethod<[string], string>,
  'get_contributions' : ActorMethod<[], string>,
  'get_proof' : ActorMethod<[string], string>,
  'registerPayment' : ActorMethod<[bigint, [] | [string]], string>,
  'send' : ActorMethod<[string, number], string>,
  'setOffsetEmissions' : ActorMethod<[[] | [string]], string>,
  'set_api_key' : ActorMethod<[string], undefined>,
  'withdraw' : ActorMethod<[Principal, bigint], string>,
}
