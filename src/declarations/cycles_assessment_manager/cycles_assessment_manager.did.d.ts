import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type RejectionCode = { 'NoError' : null } |
  { 'CanisterError' : null } |
  { 'SysTransient' : null } |
  { 'DestinationInvalid' : null } |
  { 'Unknown' : null } |
  { 'SysFatal' : null } |
  { 'CanisterReject' : null };
export type Result = { 'Ok' : Array<Principal> } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : SnsCanisters } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : BigUint64Array | bigint[] } |
  { 'Err' : [RejectionCode, string] };
export type Result_4 = { 'Ok' : SnsMetadata } |
  { 'Err' : string };
export interface SnsCanisters {
  'root' : [] | [Principal],
  'swap' : [] | [Principal],
  'ledger' : [] | [Principal],
  'index' : [] | [Principal],
  'governance' : [] | [Principal],
  'dapps' : Array<Principal>,
  'archives' : Array<Principal>,
}
export interface SnsMetadata {
  'url' : [] | [string],
  'logo' : [] | [string],
  'name' : [] | [string],
  'description' : [] | [string],
}
export interface _SERVICE {
  'calculate_canister_emission_rate' : ActorMethod<
    [number, number, number],
    number
  >,
  'fetch_root_canisters' : ActorMethod<[], Result>,
  'fetch_sns_canisters_for_root' : ActorMethod<[Principal], Result_1>,
  'get_canister_cycles_from_root' : ActorMethod<
    [Principal, Principal],
    Result_2
  >,
  'get_canister_status' : ActorMethod<[Principal], Result_3>,
  'get_root_canister_cycles_burn_rate' : ActorMethod<[Principal], Result_2>,
  'get_sns_metadata' : ActorMethod<[Principal], Result_4>,
  'update_burn_rate' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
