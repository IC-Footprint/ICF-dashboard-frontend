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
export type Result_4 = { 'Ok' : number } |
  { 'Err' : string };
export type Result_5 = { 'Ok' : SnsMetadata } |
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
export interface SnsData {
  'metadata' : Array<[Principal, SnsMetadata]>,
  'canisters' : Array<[Principal, SnsCanisters]>,
  'root_canisters' : Array<Principal>,
  'emissions_data' : Array<[Principal, SnsEmissionData]>,
  'cycle_burn_rate' : Array<[Principal, bigint]>,
  'sns_emissions' : Array<[Principal, number]>,
}
export interface SnsEmissionData {
  'cumulative_emissions' : number,
  'last_calculation_time' : bigint,
}
export interface SnsMetadata {
  'url' : [] | [string],
  'logo' : [] | [string],
  'name' : [] | [string],
  'description' : [] | [string],
}
export interface _SERVICE {
  'calculate_canister_emission_rate' : ActorMethod<
    [Principal, number, number, number],
    number
  >,
  'fetch_root_canisters' : ActorMethod<[], Result>,
  'fetch_sns_canisters_for_root' : ActorMethod<[Principal], Result_1>,
  'get_all_sns_data' : ActorMethod<[], SnsData>,
  'get_canister_cycles_from_root' : ActorMethod<
    [Principal, Principal],
    Result_2
  >,
  'get_canister_status' : ActorMethod<[Principal], Result_3>,
  'get_cumulative_sns_emissions' : ActorMethod<
    [Principal, number, number, number],
    Result_4
  >,
  'get_cycle_burn_rate' : ActorMethod<[Principal], [] | [bigint]>,
  'get_metadata' : ActorMethod<[Principal], [] | [SnsMetadata]>,
  'get_root_canister_cycles_burn_rate' : ActorMethod<[Principal], Result_2>,
  'get_root_canisters' : ActorMethod<[], Array<Principal>>,
  'get_sns_canisters' : ActorMethod<[Principal], [] | [SnsCanisters]>,
  'get_sns_emissions' : ActorMethod<[Principal], [] | [number]>,
  'get_sns_metadata' : ActorMethod<[Principal], Result_5>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
