import { useDispatch, useSelector } from 'react-redux';

import type store from '@/state/build-store';
import type { RootState } from '@/state/build-store';
import type { TypedUseSelectorHook } from 'react-redux';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
