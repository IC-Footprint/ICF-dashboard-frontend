export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Principal),
    'Err' : IDL.Text,
  });
  const SnsCanisters = IDL.Record({
    'root' : IDL.Opt(IDL.Principal),
    'swap' : IDL.Opt(IDL.Principal),
    'ledger' : IDL.Opt(IDL.Principal),
    'index' : IDL.Opt(IDL.Principal),
    'governance' : IDL.Opt(IDL.Principal),
    'dapps' : IDL.Vec(IDL.Principal),
    'archives' : IDL.Vec(IDL.Principal),
  });
  const Result_1 = IDL.Variant({ 'Ok' : SnsCanisters, 'Err' : IDL.Text });
  const SnsMetadata = IDL.Record({
    'url' : IDL.Opt(IDL.Text),
    'logo' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'description' : IDL.Opt(IDL.Text),
  });
  const SnsEmissionData = IDL.Record({
    'cumulative_emissions' : IDL.Float64,
    'last_calculation_time' : IDL.Nat64,
  });
  const SnsData = IDL.Record({
    'metadata' : IDL.Vec(IDL.Tuple(IDL.Principal, SnsMetadata)),
    'canisters' : IDL.Vec(IDL.Tuple(IDL.Principal, SnsCanisters)),
    'root_canisters' : IDL.Vec(IDL.Principal),
    'emissions_data' : IDL.Vec(IDL.Tuple(IDL.Principal, SnsEmissionData)),
    'cycle_burn_rate' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
    'sns_emissions' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Float64)),
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const RejectionCode = IDL.Variant({
    'NoError' : IDL.Null,
    'CanisterError' : IDL.Null,
    'SysTransient' : IDL.Null,
    'DestinationInvalid' : IDL.Null,
    'Unknown' : IDL.Null,
    'SysFatal' : IDL.Null,
    'CanisterReject' : IDL.Null,
  });
  const Result_3 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Nat64),
    'Err' : IDL.Tuple(RejectionCode, IDL.Text),
  });
  const Result_4 = IDL.Variant({ 'Ok' : IDL.Float64, 'Err' : IDL.Text });
  const Result_5 = IDL.Variant({ 'Ok' : SnsMetadata, 'Err' : IDL.Text });
  return IDL.Service({
    'calculate_canister_emission_rate' : IDL.Func(
        [IDL.Float64, IDL.Float64, IDL.Float64],
        [IDL.Float64],
        [],
      ),
    'fetch_root_canisters' : IDL.Func([], [Result], []),
    'fetch_sns_canisters_for_root' : IDL.Func([IDL.Principal], [Result_1], []),
    'get_all_sns_data' : IDL.Func([], [SnsData], ['query']),
    'get_canister_cycles_from_root' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [Result_2],
        [],
      ),
    'get_canister_status' : IDL.Func([IDL.Principal], [Result_3], []),
    'get_cumulative_sns_emissions' : IDL.Func(
        [IDL.Principal, IDL.Float64, IDL.Float64, IDL.Float64],
        [Result_4],
        [],
      ),
    'get_cycle_burn_rate' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Nat64)],
        ['query'],
      ),
    'get_metadata' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(SnsMetadata)],
        ['query'],
      ),
    'get_root_canister_cycles_burn_rate' : IDL.Func(
        [IDL.Principal],
        [Result_2],
        [],
      ),
    'get_root_canisters' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'get_sns_canisters' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(SnsCanisters)],
        ['query'],
      ),
    'get_sns_emissions' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Float64)],
        ['query'],
      ),
    'get_sns_metadata' : IDL.Func([IDL.Principal], [Result_5], []),
    'get_stored_sns_emissions' : IDL.Func(
        [IDL.Principal],
        [Result_4],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
