export const idlFactory = ({ IDL }) => {
  const Conf = IDL.Record({ 'ledger_canister_id' : IDL.Principal });
  const Payment = IDL.Record({
    'ticket_price' : IDL.Nat64,
    'payer' : IDL.Text,
    'block_height' : IDL.Nat,
    'ticket_count' : IDL.Nat64,
    'contribution_id' : IDL.Text,
  });
  return IDL.Service({
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'deauthorize' : IDL.Func([IDL.Principal], [], []),
    'getPrice' : IDL.Func([IDL.Nat64], [IDL.Nat], ['query']),
    'getPurchases' : IDL.Func([], [IDL.Vec(Payment)], ['query']),
    'getTicketPrice' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_contribution_by_entity' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_contribution_by_id' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_contributions' : IDL.Func([], [IDL.Text], []),
    'registerPayment' : IDL.Func([IDL.Nat64], [IDL.Text], []),
    'send' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Text], []),
    'setOffsetEmissions' : IDL.Func([], [IDL.Text], []),
    'set_api_key' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => {
  const Conf = IDL.Record({ 'ledger_canister_id' : IDL.Principal });
  return [Conf];
};
