export const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id' : IDL.Vec(IDL.Text),
    'icon' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
  });
  const Node = IDL.Record({
    'total_emissions' : IDL.Float64,
    'name' : IDL.Text,
    'offset_emissions' : IDL.Float64,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Vec(Node), 'Err' : IDL.Text });
  const SimpleClient = IDL.Record({
    'name' : IDL.Text,
    'node_ids' : IDL.Vec(IDL.Text),
  });
  const Payment = IDL.Record({
    'ticket_price' : IDL.Nat64,
    'payer' : IDL.Text,
    'block_height' : IDL.Nat64,
    'ticket_count' : IDL.Nat64,
    'contribution_id' : IDL.Text,
  });
  const Client = IDL.Record({ 'client' : IDL.Text, 'nodes' : IDL.Vec(Node) });
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponse = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponse,
  });
  return IDL.Service({
    'add_project' : IDL.Func([Project], [], []),
    'authorize' : IDL.Func([IDL.Principal], [], []),
    'deauthorize' : IDL.Func([IDL.Principal], [], []),
    'delete_all_projects' : IDL.Func([], [], []),
    'get_client_offset_emissions' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'get_emissions' : IDL.Func([], [Result], []),
    'get_node_offset_emissions' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'get_offset_emissions' : IDL.Func(
        [SimpleClient, IDL.Vec(Payment), IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'get_projects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'offset_emissions' : IDL.Func(
        [Client, IDL.Float64, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'offset_from_nodes' : IDL.Func([IDL.Vec(Node), IDL.Float64], [], []),
    'remove_project' : IDL.Func([IDL.Text], [], []),
    'select_random_nodes' : IDL.Func([], [IDL.Vec(Node)], []),
    'set_api_key' : IDL.Func([IDL.Text], [], []),
    'transform' : IDL.Func([TransformArgs], [HttpResponse], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
