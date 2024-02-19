export const idlFactory = ({ IDL }) => {
  const Conf = IDL.Record({
    node_id: IDL.Text,
    ticket_price: IDL.Nat64,
    ledger_canister_id: IDL.Principal
  });
  const Payment = IDL.Record({
    ticket_price: IDL.Nat64,
    payer: IDL.Text,
    block_height: IDL.Nat,
    ticket_count: IDL.Nat64
  });
  const Result = IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text });
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const HttpResponse = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader)
  });
  const TransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponse
  });
  return IDL.Service({
    getPrice: IDL.Func([IDL.Nat64], [IDL.Nat], ['query']),
    getPurchases: IDL.Func([], [IDL.Vec(Payment)], ['query']),
    getTicketPrice: IDL.Func([], [IDL.Nat64], ['query']),
    registerPayment: IDL.Func([IDL.Nat64], [Result], []),
    send: IDL.Func([IDL.Text, IDL.Nat64], [IDL.Text], []),
    transform: IDL.Func([TransformArgs], [HttpResponse], ['query'])
  });
};
export const init = ({ IDL }) => {
  const Conf = IDL.Record({
    node_id: IDL.Text,
    ticket_price: IDL.Nat64,
    ledger_canister_id: IDL.Principal
  });
  return [Conf];
};
