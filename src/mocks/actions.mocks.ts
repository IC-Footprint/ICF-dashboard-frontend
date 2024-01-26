import type { AnyAction } from 'redux';

export function mockAction(type = 'mock', payload?: unknown): AnyAction {
  return {
    type,
    payload
  };
}
