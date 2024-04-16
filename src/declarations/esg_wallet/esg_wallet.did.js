export const idlFactory = ({ IDL }) => {
  const Conf = IDL.Record({ 'ledger_canister_id' : IDL.Principal });
  const Payment = IDL.Record({
    'node_id' : IDL.Opt(IDL.Text),
    'ticket_price' : IDL.Float64,
    'cawa_url' : IDL.Text,
    'payer' : IDL.Text,
    'block_height' : IDL.Nat,
    'ticket_count' : IDL.Float64,
  });
  return IDL.Service({
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'deauthorize' : IDL.Func([IDL.Principal], [], []),
    'getPrice' : IDL.Func([IDL.Float64], [IDL.Float64], ['query']),
    'getPurchases' : IDL.Func([], [IDL.Vec(Payment)], ['query']),
    'getPurchasesByNodeId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Payment)],
        ['query'],
      ),
    'getTicketPrice' : IDL.Func([], [IDL.Float64], ['query']),
    'get_contribution_by_entity' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_contribution_by_id' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_contributions' : IDL.Func([], [IDL.Text], []),
    'get_proof' : IDL.Func([IDL.Text], [IDL.Text], []),
    'registerPayment' : IDL.Func(
        [IDL.Nat64, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'send' : IDL.Func([IDL.Text, IDL.Float64], [IDL.Text], []),
    'setOffsetEmissions' : IDL.Func([IDL.Opt(IDL.Text)], [IDL.Text], []),
    'set_api_key' : IDL.Func([IDL.Text], [], []),
    'withdraw' : IDL.Func([IDL.Principal, IDL.Nat64], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => {
  const Conf = IDL.Record({ 'ledger_canister_id' : IDL.Principal });
  return [Conf];
};
