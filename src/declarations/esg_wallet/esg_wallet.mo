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
    ticket_price : Nat64;
    payer : Text;
    block_height : Nat;
    ticket_count : Nat64;
    contribution_id : Text;
  };
  public type Result = { #Ok : Payment; #Err : Text };
  public type TransformArgs = { context : Blob; response : HttpResponse };
  public type Self = Conf -> async actor {
    authorize : shared Principal -> async ();
    deauthorize : shared Principal -> async ();
    getPrice : shared query Nat64 -> async Nat;
    getPurchases : shared query () -> async [Payment];
    getTicketPrice : shared query () -> async Nat64;
    get_contribution_by_entity : shared Text -> async Text;
    get_contribution_by_id : shared Text -> async Text;
    get_contributions : shared () -> async Text;
    registerPayment : shared Nat64 -> async Text;
    send : shared (Text, Nat64) -> async Text;
    setOffsetEmissions : shared () -> async Text;
    set_api_key : shared Text -> async ();
  }
}
