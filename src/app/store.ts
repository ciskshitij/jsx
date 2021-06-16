import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import panelReducer from '../features/panels/panelsSlice';

export const store = configureStore({
  reducer: { panelReducer }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
