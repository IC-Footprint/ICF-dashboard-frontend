// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Client = { name : Text; node_ids : [Text] };
  public type Conf = { ledger_canister_id : Principal };
  public type HttpHeader = { value : Text; name : Text };
  public type HttpResponse = {
    status : Nat;
    body : Blob;
    headers : [HttpHeader];
  };
  public type Payment = {
    node_id : ?Text;
    ticket_price : Float;
    cawa_url : Text;
    payer : Text;
    block_height : Nat;
    ticket_count : Float;
  };
  public type Result = { #Ok; #Err };
  public type Result_1 = { #Ok : Principal; #Err };
  public type TransformArgs = { context : Blob; response : HttpResponse };
  public type Self = Conf -> async actor {
    authorize : shared Principal -> async ();
    deauthorize : shared Principal -> async ();
    getPrice : shared query Float -> async Float;
    getPurchases : shared query () -> async [Payment];
    getPurchasesByNodeId : shared query Text -> async [Payment];
    getTicketPrice : shared query () -> async Float;
    get_contribution_by_entity : shared Text -> async Text;
    get_contribution_by_id : shared Text -> async Text;
    get_contributions : shared () -> async Text;
    get_proof : shared Text -> async Text;
    registerPayment : shared (Nat64, ?Text) -> async Text;
    send : shared (Text, Float) -> async Text;
    setOffsetEmissions : shared ?Text -> async Text;
    set_api_key : shared Text -> async ();
    withdraw : shared (Principal, Nat64) -> async Text;
  }
}
