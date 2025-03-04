import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AdminCommand = { 'token_collect' : TokenId } |
  { 'pair_add' : PairConfig } |
  { 'pair_del' : PairId } |
  { 'pair_set' : [PairId, PairConfig] } |
  { 'token_add' : TokenConfig } |
  { 'token_del' : TokenId } |
  { 'token_set' : [TokenId, TokenConfig] };
export interface Asset { 'class' : AssetClass, 'symbol' : string }
export type AssetClass = { 'Cryptocurrency' : null } |
  { 'FiatCurrency' : null };
export type DepthAsk50 = Array<number>;
export type DepthBid50 = Array<number>;
export type ErrorCode = { 'canister_error' : null } |
  { 'call_error' : { 'err_code' : number } } |
  { 'system_transient' : null } |
  { 'future' : number } |
  { 'canister_reject' : null } |
  { 'destination_invalid' : null } |
  { 'system_fatal' : null };
export type ErrorLine = [Time, string, ErrorCode, string];
export type Frame = { 't1d' : null } |
  { 't1h' : null } |
  { 't5m' : null };
export type GetError = { 'invalid_frame' : null };
export type High = number;
export type LastAsk = number;
export type LastBid = number;
export interface LatestExtendedRate {
  'to_token' : TokenId,
  'rate' : number,
  'volume' : number,
  'depth50' : number,
  'depth2' : number,
  'depth8' : number,
  'symbol' : string,
}
export interface LatestExtendedToken {
  'id' : TokenId,
  'last' : [] | [LatestExtendedTokenTickItem],
  'config' : TokenConfig,
  'rates' : Array<LatestExtendedRate>,
}
export interface LatestExtendedTokenTickItem {
  'fee' : bigint,
  'dissolving_30d' : bigint,
  'circulating_supply' : bigint,
  'other_treasuries' : Array<[TokenId, bigint]>,
  'total_locked' : bigint,
  'dissolving_1d' : bigint,
  'dissolving_1y' : bigint,
  'total_supply' : bigint,
  'treasury' : bigint,
}
export type LatestTokenRow = [[TokenId, TokenId], string, number];
export interface LatestWalletTokenTicks {
  't6h' : Array<number>,
  'to_id' : TokenId,
  'from_id' : TokenId,
}
export interface LatestWalletTokens {
  'ticks' : Array<LatestWalletTokenTicks>,
  'latest' : Array<LatestExtendedToken>,
}
export interface LockingTick {
  'not_dissolving' : Array<bigint>,
  'other_treasuries' : Array<[TokenId, bigint]>,
  'total_locked' : bigint,
  'dissolving' : Array<bigint>,
  'treasury' : bigint,
}
export type Low = number;
export interface NodeInfoShared {
  'bad' : bigint,
  'principal' : Principal,
  'good' : bigint,
  'last' : Time,
  'name' : string,
}
export type OraclePushError = { 'not_in_validator_set' : null } |
  { 'too_early' : null };
export interface PairConfig {
  'deleted' : boolean,
  'tokens' : [TokenId, TokenId],
  'config' : { 'xrc' : { 'quote_asset' : Asset, 'base_asset' : Asset } } |
    { 'oracle' : { 'id' : string } } |
    { 'icpswap' : { 'canister' : Principal } } |
    { 'sonic' : { 'id' : string } } |
    { 'icdex' : { 'canister' : Principal } },
}
export type PairId = bigint;
export type Result = { 'ok' : Time } |
  { 'err' : OraclePushError };
export type Result_1 = {
    'ok' : {
      'first' : Time,
      'data' : Array<TokenTickShared>,
      'last' : Time,
      'updated' : Time,
    }
  } |
  { 'err' : GetError };
export type Result_2 = {
    'ok' : {
      'first' : Time,
      'data' : Array<TickShared>,
      'last' : Time,
      'updated' : Time,
    }
  } |
  { 'err' : GetError };
export type Result_3 = { 'ok' : null } |
  { 'err' : string };
export interface SnsConfig {
  'root' : Principal,
  'swap' : Principal,
  'ledger' : Principal,
  'other_treasuries' : Array<
    {
      'token_id' : TokenId,
      'owner' : Principal,
      'subaccount' : Uint8Array | number[],
    }
  >,
  'index' : Principal,
  'governance' : Principal,
  'treasury_subaccount' : Uint8Array | number[],
}
export type TickItem = [
  High,
  Low,
  LastBid,
  LastAsk,
  Volume24,
  DepthBid50,
  DepthAsk50,
];
export type TickShared = Array<[] | [TickItem]>;
export type Time = bigint;
export interface TokenConfig {
  'decimals' : bigint,
  'deleted' : boolean,
  'locking' : TokenLocking,
  'name' : string,
  'ledger' : { 'none' : null } |
    { 'icrc1' : { 'ledger' : Principal } } |
    { 'dip20' : { 'ledger' : Principal } },
  'details' : Array<TokenDetail>,
  'symbol' : string,
}
export type TokenDetail = { 'link' : { 'href' : string, 'name' : string } } |
  {
    'sns_sale' : { 'end' : Time, 'sold_tokens' : bigint, 'price_usd' : number }
  };
export type TokenId = bigint;
export type TokenLocking = { 'ogy' : null } |
  { 'sns' : SnsConfig } |
  { 'none' : null };
export interface TokenTickItem {
  'fee' : bigint,
  'locking' : [] | [LockingTick],
  'circulating_supply' : bigint,
  'total_supply' : bigint,
}
export type TokenTickShared = Array<[] | [TokenTickItem]>;
export type Volume24 = number;
export interface _SERVICE {
  'admin' : ActorMethod<[Array<AdminCommand>], undefined>,
  'controller_export_pair' : ActorMethod<
    [Frame, Time, bigint, bigint],
    Array<[] | [TickItem]>
  >,
  'controller_import_pair' : ActorMethod<
    [
      Frame,
      Time,
      bigint,
      Array<[] | [TickItem]>,
      { 'add' : null } |
        { 'overwrite' : null },
    ],
    undefined
  >,
  'controller_oracle_add' : ActorMethod<[string, Principal], Result_3>,
  'controller_oracle_rem' : ActorMethod<[Principal], Result_3>,
  'get_config' : ActorMethod<
    [],
    { 'tokens' : Array<TokenConfig>, 'pairs' : Array<PairConfig> }
  >,
  'get_latest' : ActorMethod<[], Array<LatestTokenRow>>,
  'get_latest_extended' : ActorMethod<[], Array<LatestExtendedToken>>,
  'get_latest_wallet_tokens' : ActorMethod<[], LatestWalletTokens>,
  'get_pairs' : ActorMethod<
    [Frame, Array<bigint>, [] | [Time], [] | [Time]],
    Result_2
  >,
  'get_tokens' : ActorMethod<
    [Array<bigint>, [] | [Time], [] | [Time]],
    Result_1
  >,
  'log_show' : ActorMethod<[], Array<[] | [ErrorLine]>>,
  'oracle_push' : ActorMethod<[{ 'data' : Array<[string, number]> }], Result>,
  'oracles_get' : ActorMethod<[], Array<NodeInfoShared>>,
}

export const idlFactory = ({ IDL }: { IDL: any }) => {
  const TokenId = IDL.Nat;
  const AssetClass = IDL.Variant({
    'Cryptocurrency' : IDL.Null,
    'FiatCurrency' : IDL.Null,
  });
  const Asset = IDL.Record({ 'class' : AssetClass, 'symbol' : IDL.Text });
  const PairConfig = IDL.Record({
    'deleted' : IDL.Bool,
    'tokens' : IDL.Tuple(TokenId, TokenId),
    'config' : IDL.Variant({
      'xrc' : IDL.Record({ 'quote_asset' : Asset, 'base_asset' : Asset }),
      'oracle' : IDL.Record({ 'id' : IDL.Text }),
      'icpswap' : IDL.Record({ 'canister' : IDL.Principal }),
      'sonic' : IDL.Record({ 'id' : IDL.Text }),
      'icdex' : IDL.Record({ 'canister' : IDL.Principal }),
    }),
  });
  const PairId = IDL.Nat;
  const SnsConfig = IDL.Record({
    'root' : IDL.Principal,
    'swap' : IDL.Principal,
    'ledger' : IDL.Principal,
    'other_treasuries' : IDL.Vec(
      IDL.Record({
        'token_id' : TokenId,
        'owner' : IDL.Principal,
        'subaccount' : IDL.Vec(IDL.Nat8),
      })
    ),
    'index' : IDL.Principal,
    'governance' : IDL.Principal,
    'treasury_subaccount' : IDL.Vec(IDL.Nat8),
  });
  const TokenLocking = IDL.Variant({
    'ogy' : IDL.Null,
    'sns' : SnsConfig,
    'none' : IDL.Null,
  });
  const Time = IDL.Int;
  const TokenDetail = IDL.Variant({
    'link' : IDL.Record({ 'href' : IDL.Text, 'name' : IDL.Text }),
    'sns_sale' : IDL.Record({
      'end' : Time,
      'sold_tokens' : IDL.Nat,
      'price_usd' : IDL.Float64,
    }),
  });
  const TokenConfig = IDL.Record({
    'decimals' : IDL.Nat,
    'deleted' : IDL.Bool,
    'locking' : TokenLocking,
    'name' : IDL.Text,
    'ledger' : IDL.Variant({
      'none' : IDL.Null,
      'icrc1' : IDL.Record({ 'ledger' : IDL.Principal }),
      'dip20' : IDL.Record({ 'ledger' : IDL.Principal }),
    }),
    'details' : IDL.Vec(TokenDetail),
    'symbol' : IDL.Text,
  });
  const AdminCommand = IDL.Variant({
    'token_collect' : TokenId,
    'pair_add' : PairConfig,
    'pair_del' : PairId,
    'pair_set' : IDL.Tuple(PairId, PairConfig),
    'token_add' : TokenConfig,
    'token_del' : TokenId,
    'token_set' : IDL.Tuple(TokenId, TokenConfig),
  });
  const Frame = IDL.Variant({
    't1d' : IDL.Null,
    't1h' : IDL.Null,
    't5m' : IDL.Null,
  });
  const High = IDL.Float64;
  const Low = IDL.Float64;
  const LastBid = IDL.Float64;
  const LastAsk = IDL.Float64;
  const Volume24 = IDL.Float64;
  const DepthBid50 = IDL.Vec(IDL.Float64);
  const DepthAsk50 = IDL.Vec(IDL.Float64);
  const TickItem = IDL.Tuple(
    High,
    Low,
    LastBid,
    LastAsk,
    Volume24,
    DepthBid50,
    DepthAsk50,
  );
  const Result_3 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const LatestTokenRow = IDL.Tuple(
    IDL.Tuple(TokenId, TokenId),
    IDL.Text,
    IDL.Float64,
  );
  const LatestExtendedTokenTickItem = IDL.Record({
    'fee' : IDL.Nat,
    'dissolving_30d' : IDL.Nat,
    'circulating_supply' : IDL.Nat,
    'other_treasuries' : IDL.Vec(IDL.Tuple(TokenId, IDL.Nat)),
    'total_locked' : IDL.Nat,
    'dissolving_1d' : IDL.Nat,
    'dissolving_1y' : IDL.Nat,
    'total_supply' : IDL.Nat,
    'treasury' : IDL.Nat,
  });
  const LatestExtendedRate = IDL.Record({
    'to_token' : TokenId,
    'rate' : IDL.Float64,
    'volume' : IDL.Float64,
    'depth50' : IDL.Float64,
    'depth2' : IDL.Float64,
    'depth8' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  const LatestExtendedToken = IDL.Record({
    'id' : TokenId,
    'last' : IDL.Opt(LatestExtendedTokenTickItem),
    'config' : TokenConfig,
    'rates' : IDL.Vec(LatestExtendedRate),
  });
  const LatestWalletTokenTicks = IDL.Record({
    't6h' : IDL.Vec(IDL.Float64),
    'to_id' : TokenId,
    'from_id' : TokenId,
  });
  const LatestWalletTokens = IDL.Record({
    'ticks' : IDL.Vec(LatestWalletTokenTicks),
    'latest' : IDL.Vec(LatestExtendedToken),
  });
  const TickShared = IDL.Vec(IDL.Opt(TickItem));
  const GetError = IDL.Variant({ 'invalid_frame' : IDL.Null });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Record({
      'first' : Time,
      'data' : IDL.Vec(TickShared),
      'last' : Time,
      'updated' : Time,
    }),
    'err' : GetError,
  });
  const LockingTick = IDL.Record({
    'not_dissolving' : IDL.Vec(IDL.Nat),
    'other_treasuries' : IDL.Vec(IDL.Tuple(TokenId, IDL.Nat)),
    'total_locked' : IDL.Nat,
    'dissolving' : IDL.Vec(IDL.Nat),
    'treasury' : IDL.Nat,
  });
  const TokenTickItem = IDL.Record({
    'fee' : IDL.Nat,
    'locking' : IDL.Opt(LockingTick),
    'circulating_supply' : IDL.Nat,
    'total_supply' : IDL.Nat,
  });
  const TokenTickShared = IDL.Vec(IDL.Opt(TokenTickItem));
  const Result_1 = IDL.Variant({
    'ok' : IDL.Record({
      'first' : Time,
      'data' : IDL.Vec(TokenTickShared),
      'last' : Time,
      'updated' : Time,
    }),
    'err' : GetError,
  });
  const ErrorCode = IDL.Variant({
    'canister_error' : IDL.Null,
    'call_error' : IDL.Record({ 'err_code' : IDL.Nat32 }),
    'system_transient' : IDL.Null,
    'future' : IDL.Nat32,
    'canister_reject' : IDL.Null,
    'destination_invalid' : IDL.Null,
    'system_fatal' : IDL.Null,
  });
  const ErrorLine = IDL.Tuple(Time, IDL.Text, ErrorCode, IDL.Text);
  const OraclePushError = IDL.Variant({
    'not_in_validator_set' : IDL.Null,
    'too_early' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : Time, 'err' : OraclePushError });
  const NodeInfoShared = IDL.Record({
    'bad' : IDL.Nat,
    'principal' : IDL.Principal,
    'good' : IDL.Nat,
    'last' : Time,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'admin' : IDL.Func([IDL.Vec(AdminCommand)], [], []),
    'controller_export_pair' : IDL.Func(
        [Frame, Time, IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Opt(TickItem))],
        [],
      ),
    'controller_import_pair' : IDL.Func(
        [
          Frame,
          Time,
          IDL.Nat,
          IDL.Vec(IDL.Opt(TickItem)),
          IDL.Variant({ 'add' : IDL.Null, 'overwrite' : IDL.Null }),
        ],
        [],
        [],
      ),
    'controller_oracle_add' : IDL.Func(
        [IDL.Text, IDL.Principal],
        [Result_3],
        [],
      ),
    'controller_oracle_rem' : IDL.Func([IDL.Principal], [Result_3], []),
    'get_config' : IDL.Func(
        [],
        [
          IDL.Record({
            'tokens' : IDL.Vec(TokenConfig),
            'pairs' : IDL.Vec(PairConfig),
          }),
        ],
        ['query'],
      ),
    'get_latest' : IDL.Func([], [IDL.Vec(LatestTokenRow)], ['query']),
    'get_latest_extended' : IDL.Func(
        [],
        [IDL.Vec(LatestExtendedToken)],
        ['query'],
      ),
    'get_latest_wallet_tokens' : IDL.Func([], [LatestWalletTokens], ['query']),
    'get_pairs' : IDL.Func(
        [Frame, IDL.Vec(IDL.Nat), IDL.Opt(Time), IDL.Opt(Time)],
        [Result_2],
        ['query'],
      ),
    'get_tokens' : IDL.Func(
        [IDL.Vec(IDL.Nat), IDL.Opt(Time), IDL.Opt(Time)],
        [Result_1],
        ['query'],
      ),
    'log_show' : IDL.Func([], [IDL.Vec(IDL.Opt(ErrorLine))], ['query']),
    'oracle_push' : IDL.Func(
        [IDL.Record({ 'data' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Float64)) })],
        [Result],
        [],
      ),
    'oracles_get' : IDL.Func([], [IDL.Vec(NodeInfoShared)], ['query']),
  });
};