import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import signInPageReducer from '../components/SignInPage/signInPageSlice';
import postBoardPageReducer from '../components/PostBoardPage/postBoardPageSlice';

export const store = configureStore({
  reducer: {
    signInPage: signInPageReducer,
    postBoardPage: postBoardPageReducer,
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
