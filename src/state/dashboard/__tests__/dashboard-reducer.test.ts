import { expect, describe, test } from 'vitest';

import { mockAction } from '@/mocks/actions.mocks';
import { ModelMocks } from '@/mocks/model.mocks';
import reducer, {
  initialState,
  getHeadlineFiguresAction
} from '@/state/dashboard/dashboard-slice';

test('should return the initial state', () => {
  expect(reducer(undefined, mockAction())).toEqual(initialState());
});

describe('getHeadlineFiguresAction', () => {
  test('should set headline figures loading to true when the action is loading', () => {
    const state = reducer(
      initialState(),
      mockAction(getHeadlineFiguresAction.pending.type)
    );
    expect(state.headlineFiguresLoading).toBe(true);
    expect(state.headlineFiguresError).toBe(false);
  });

  test('should set headline figures loading to false when the action is fulfilled', () => {
    const state = reducer(
      initialState(),
      mockAction(
        getHeadlineFiguresAction.fulfilled.type,
        ModelMocks.mockHeadlineFigures()
      )
    );
    expect(state.headlineFiguresLoading).toBe(false);
    expect(state.headlineFigures).toEqual(ModelMocks.mockHeadlineFigures());
  });

  test('should set headline figures error to true when the action is rejected', () => {
    const state = reducer(
      initialState(),
      mockAction(getHeadlineFiguresAction.rejected.type)
    );
    expect(state.headlineFiguresLoading).toBe(false);
    expect(state.headlineFiguresError).toBe(true);
  });
});
