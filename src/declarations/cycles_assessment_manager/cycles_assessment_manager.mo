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
  public type Result_4 = { #Ok : Float; #Err : Text };
  public type Result_5 = { #Ok : SnsMetadata; #Err : Text };
  public type SnsCanisters = {
    root : ?Principal;
    swap : ?Principal;
    ledger : ?Principal;
    index : ?Principal;
    governance : ?Principal;
    dapps : [Principal];
    archives : [Principal];
  };
  public type SnsData = {
    metadata : [(Principal, SnsMetadata)];
    canisters : [(Principal, SnsCanisters)];
    root_canisters : [Principal];
    emissions_data : [(Principal, SnsEmissionData)];
    cycle_burn_rate : [(Principal, Nat64)];
    sns_emissions : [(Principal, Float)];
  };
  public type SnsEmissionData = {
    cumulative_emissions : Float;
    last_calculation_time : Nat64;
  };
  public type SnsMetadata = {
    url : ?Text;
    logo : ?Text;
    name : ?Text;
    description : ?Text;
  };
  public type Self = actor {
    calculate_canister_emission_rate : shared (
        Principal,
        Float,
        Float,
        Float,
      ) -> async Float;
    fetch_root_canisters : shared () -> async Result;
    fetch_sns_canisters_for_root : shared Principal -> async Result_1;
    get_all_sns_data : shared query () -> async SnsData;
    get_canister_cycles_from_root : shared (
        Principal,
        Principal,
      ) -> async Result_2;
    get_canister_status : shared Principal -> async Result_3;
    get_cumulative_sns_emissions : shared (
        Principal,
        Float,
        Float,
        Float,
      ) -> async Result_4;
    get_cycle_burn_rate : shared query Principal -> async ?Nat64;
    get_metadata : shared query Principal -> async ?SnsMetadata;
    get_root_canister_cycles_burn_rate : shared Principal -> async Result_2;
    get_root_canisters : shared query () -> async [Principal];
    get_sns_canisters : shared query Principal -> async ?SnsCanisters;
    get_sns_emissions : shared query Principal -> async ?Float;
    get_sns_metadata : shared Principal -> async Result_5;
  }
}
