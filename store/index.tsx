import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import user from './user/slice';

const store = configureStore({
  reducer: {
    user,
  },
});

export const wrapper = createWrapper(() => store);
export const storeMain = store;
export type StoreMain = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch();
