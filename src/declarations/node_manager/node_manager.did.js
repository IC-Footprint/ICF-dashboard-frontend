export const idlFactory = ({ IDL }) => {
  const Node = IDL.Record({
    'offsetEmissions' : IDL.Float64,
    'name' : IDL.Text,
    'totalEmissions' : IDL.Float64,
  });
  const GetEmissionsResponse = IDL.Variant({
    'Ok' : IDL.Vec(Node),
    'Err' : IDL.Text,
  });
  const SimpleClient = IDL.Record({
    'name' : IDL.Text,
    'node_ids' : IDL.Vec(IDL.Text),
  });
  const Payment = IDL.Record({
    'ticket_price' : IDL.Nat64,
    'payer' : IDL.Text,
    'block_height' : IDL.Nat,
    'ticket_count' : IDL.Nat64,
    'contribution_id' : IDL.Text,
  });
  const Client = IDL.Record({
    'client' : IDL.Text,
    'nodes' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  return IDL.Service({
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'deauthorize' : IDL.Func([IDL.Principal], [], []),
    'get_client_offset_emissions' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'get_emissions' : IDL.Func([], [GetEmissionsResponse], []),
    'get_node_offset_emissions' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'get_offset_emissions' : IDL.Func([SimpleClient, Payment], [], []),
    'offset_emissions' : IDL.Func(
        [Client, IDL.Float64, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'set_api_key' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
