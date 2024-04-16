import type { Principal } from '@dfinity/principal';

import type { Result, Result_1 } from '@/declarations/esg_wallet/esg_wallet.did';
// import type { Result } from '@/declarations/esg_wallet/esg_wallet.did';

export class CandidMapper {
  static handleResult(result: Result): boolean {
    return 'Ok' in result;
  }

  static handleResult1(result: Result_1): Principal | null {
    if ('Ok' in result) {
      return result.Ok;
    }
    return null;
  }
}
