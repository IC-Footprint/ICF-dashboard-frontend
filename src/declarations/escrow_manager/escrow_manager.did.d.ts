import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'Ok' : null } |
  { 'Err' : null };
export type Result_1 = { 'Ok' : Principal } |
  { 'Err' : null };
export interface _SERVICE {
  'addNodeEscrow' : ActorMethod<[string, Principal], Result>,
  'getNodeEscrow' : ActorMethod<[string], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
