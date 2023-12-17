import { configureStore } from '@reduxjs/toolkit';
import { imageApiSlice } from '../features/images/imageApi.slice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [imageApiSlice.reducerPath]: imageApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(imageApiSlice.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
