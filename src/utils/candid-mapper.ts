import type { Principal } from '@dfinity/principal';

import type { Result_1 } from '@/declarations/escrow_manager/escrow_manager.did';
import type { Result } from '@/declarations/node_escrow/node_escrow.did';

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
