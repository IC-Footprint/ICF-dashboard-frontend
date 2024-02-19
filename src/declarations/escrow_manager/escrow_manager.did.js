export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Null });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Principal, 'Err' : IDL.Null });
  return IDL.Service({
    'addNodeEscrow' : IDL.Func([IDL.Text, IDL.Principal], [Result], []),
    'getNodeEscrow' : IDL.Func([IDL.Text], [Result_1], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
