import {
  configureStore,
  type Reducer,
  type UnknownAction,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  type PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';
import { metricsMiddleware } from './middlewares/metrics-middleware';
import type { RootState } from './root-reducer';
import { contactsApi } from '@shared/api';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
};

const persistedReducer = persistReducer<RootState, UnknownAction>(
  persistConfig,
  rootReducer as unknown as Reducer<RootState, UnknownAction>,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware, metricsMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type { RootState };
