// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type RejectionCode = {
    #NoError;
    #CanisterError;
    #SysTransient;
    #DestinationInvalid;
    #Unknown;
    #SysFatal;
    #CanisterReject;
  };
  public type Result = { #Ok : [Principal]; #Err : Text };
  public type Result_1 = { #Ok : SnsCanisters; #Err : Text };
  public type Result_2 = { #Ok : Nat64; #Err : Text };
  public type Result_3 = { #Ok : [Nat64]; #Err : (RejectionCode, Text) };
  public type Result_4 = { #Ok : SnsMetadata; #Err : Text };
  public type SnsCanisters = {
    root : ?Principal;
    swap : ?Principal;
    ledger : ?Principal;
    index : ?Principal;
    governance : ?Principal;
    dapps : [Principal];
    archives : [Principal];
  };
  public type SnsMetadata = {
    url : ?Text;
    logo : ?Text;
    name : ?Text;
    description : ?Text;
  };
  public type Self = actor {
    calculate_canister_emission_rate : shared (
        Float,
        Float,
        Float,
      ) -> async Float;
    fetch_root_canisters : shared () -> async Result;
    fetch_sns_canisters_for_root : shared Principal -> async Result_1;
    get_canister_cycles_from_root : shared (
        Principal,
        Principal,
      ) -> async Result_2;
    get_canister_status : shared Principal -> async Result_3;
    get_root_canister_cycles_burn_rate : shared Principal -> async Result_2;
    get_sns_metadata : shared Principal -> async Result_4;
    update_burn_rate : shared Nat64 -> async ();
  }
}
