import { mockAction } from '@/mocks/actions.mocks';
import { ModelMocks } from '@/mocks/model.mocks';
import reducer, {
  getDashboardCarbonDebitAction,
  initialState
} from '@/state/dashboard/dashboard-slice';

test('should return the initial state', () => {
  expect(reducer(undefined, mockAction())).toEqual(initialState());
});

describe('getHeadlineFiguresAction', () => {
  test('should set carbon debit loading to true when the action is loading', () => {
    const state = reducer(
      initialState(),
      mockAction(getDashboardCarbonDebitAction.pending.type)
    );
    expect(state.carbonDebitLoading).toBe(true);
    expect(state.carbonDebitError).toBe(false);
  });

  test('should set carbon debit loading to false when the action is fulfilled', () => {
    const state = reducer(
      initialState(),
      mockAction(
        getDashboardCarbonDebitAction.fulfilled.type,
        ModelMocks.mockCarbonDebit()
      )
    );
    expect(state.carbonDebitLoading).toBe(false);
    expect(state.carbonDebit).toEqual(ModelMocks.mockCarbonDebit());
  });

  test('should set carbon debit error to true when the action is rejected', () => {
    const state = reducer(
      initialState(),
      mockAction(getDashboardCarbonDebitAction.rejected.type)
    );
    expect(state.carbonDebitLoading).toBe(false);
    expect(state.carbonDebitError).toBe(true);
  });
});
