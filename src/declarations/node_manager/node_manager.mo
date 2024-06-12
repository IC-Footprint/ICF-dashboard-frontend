// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Client = { client : Text; nodes : [Node] };
  public type HttpHeader = { value : Text; name : Text };
  public type HttpResponse = {
    status : Nat;
    body : Blob;
    headers : [HttpHeader];
  };
  public type Node = {
    total_emissions : Float;
    name : Text;
    offset_emissions : Float;
  };
  public type Payment = {
    ticket_price : Nat64;
    payer : Text;
    block_height : Nat64;
    ticket_count : Nat64;
    contribution_id : Text;
  };
  public type Project = { id : [Text]; icon : ?Text; name : Text };
  public type Result = { #Ok : [Node]; #Err : Text };
  public type SimpleClient = { name : Text; node_ids : [Text] };
  public type TransformArgs = { context : Blob; response : HttpResponse };
  public type Self = actor {
    add_project : shared Project -> async ();
    authorize : shared Principal -> async ();
    deauthorize : shared Principal -> async ();
    delete_all_projects : shared () -> async ();
    get_client_offset_emissions : shared query Text -> async Text;
    get_emissions : shared () -> async Result;
    get_node_offset_emissions : shared query Text -> async Text;
    get_offset_emissions : shared (
        SimpleClient,
        [Payment],
        ?Text,
      ) -> async Text;
    get_projects : shared query () -> async [Project];
    offset_emissions : shared (Client, Float, ?Text) -> async Text;
    offset_from_nodes : shared ([Node], Float) -> async ();
    remove_project : shared Text -> async ();
    select_random_nodes : shared () -> async [Node];
    set_api_key : shared Text -> async ();
    transform : shared query TransformArgs -> async HttpResponse;
  }
}
