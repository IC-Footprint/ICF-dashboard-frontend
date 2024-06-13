import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Client { 'client' : string, 'nodes' : Array<Node> }
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface Node {
  'total_emissions' : number,
  'name' : string,
  'offset_emissions' : number,
}
export interface Payment {
  'ticket_price' : bigint,
  'payer' : string,
  'block_height' : bigint,
  'ticket_count' : bigint,
  'contribution_id' : string,
}
export interface Project {
  'id' : Array<string>,
  'icon' : [] | [string],
  'name' : string,
}
export type Result = { 'Ok' : Array<Node> } |
  { 'Err' : string };
export interface SimpleClient { 'name' : string, 'node_ids' : Array<string> }
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface _SERVICE {
  'add_project' : ActorMethod<[Project], undefined>,
  'authorize' : ActorMethod<[Principal], undefined>,
  'deauthorize' : ActorMethod<[Principal], undefined>,
  'delete_all_projects' : ActorMethod<[], undefined>,
  'get_client_offset_emissions' : ActorMethod<[string], string>,
  'get_emissions' : ActorMethod<[], Result>,
  'get_node_offset_emissions' : ActorMethod<[string], string>,
  'get_offset_emissions' : ActorMethod<
    [SimpleClient, Array<Payment>, [] | [string]],
    string
  >,
  'get_projects' : ActorMethod<[], Array<Project>>,
  'offset_emissions' : ActorMethod<[Client, number, [] | [string]], string>,
  'offset_from_nodes' : ActorMethod<[Array<Node>, number], undefined>,
  'registerPayment' : ActorMethod<[bigint, [] | [string]], string>,
  'remove_project' : ActorMethod<[string], undefined>,
  'select_random_nodes' : ActorMethod<[], Array<Node>>,
  'set_api_key' : ActorMethod<[string], undefined>,
  'transform' : ActorMethod<[TransformArgs], HttpResponse>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
