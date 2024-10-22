import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Auth } from '../models/auth.model';
import authReducer from "./states/auth.state"

import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

export interface AppStore {
    auth: Auth; // Añade otros estados aquí según sea necesario
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })//.concat(validationMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;