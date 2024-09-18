import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import makeReducer from './slices/makeSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    make: makeReducer,
    category: categoryReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;