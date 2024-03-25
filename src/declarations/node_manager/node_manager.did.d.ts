import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Client { 'client' : string, 'nodes' : [] | [Array<string>] }
export type GetEmissionsResponse = { 'Ok' : Array<Node> } |
  { 'Err' : string };
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface Node {
  'offsetEmissions' : number,
  'name' : string,
  'totalEmissions' : number,
}
export interface Payment {
  'ticket_price' : bigint,
  'payer' : string,
  'block_height' : bigint,
  'ticket_count' : bigint,
  'contribution_id' : string,
}
export interface SimpleClient { 'name' : string, 'node_ids' : Array<string> }
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface _SERVICE {
  'authorize' : ActorMethod<[Principal], undefined>,
  'deauthorize' : ActorMethod<[Principal], undefined>,
  'get_emissions' : ActorMethod<[], GetEmissionsResponse>,
  'get_offset_emissions' : ActorMethod<[SimpleClient, Payment], undefined>,
  'offset_emissions' : ActorMethod<[Client, number, [] | [string]], string>,
  'set_api_key' : ActorMethod<[string], undefined>,
}
