import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice';

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
