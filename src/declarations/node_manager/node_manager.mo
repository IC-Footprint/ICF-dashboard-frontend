// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Client = { client : Text; nodes : ?[Text] };
  public type GetEmissionsResponse = { #Ok : [Node]; #Err : Text };
  public type HttpHeader = { value : Text; name : Text };
  public type HttpResponse = {
    status : Nat;
    body : Blob;
    headers : [HttpHeader];
  };
  public type Node = {
    offsetEmissions : Float;
    name : Text;
    totalEmissions : Float;
  };
  public type Payment = {
    ticket_price : Nat64;
    payer : Text;
    block_height : Nat;
    ticket_count : Nat64;
    contribution_id : Text;
  };
  public type SimpleClient = { name : Text; node_ids : [Text] };
  public type TransformArgs = { context : Blob; response : HttpResponse };
  public type Self = actor {
    authorize : shared Principal -> async ();
    deauthorize : shared Principal -> async ();
    get_client_offset_emissions : shared query Text -> async Text;
    get_emissions : shared () -> async GetEmissionsResponse;
    get_node_offset_emissions : shared query Text -> async Text;
    get_offset_emissions : shared (SimpleClient, Payment) -> async ();
    offset_emissions : shared (Client, Float, ?Text) -> async Text;
    set_api_key : shared Text -> async ();
  }
}
