import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Auth } from '../models/auth.model';
import { UserAuth } from 'src/models/userAuth.model';
import authReducer from "./states/auth.state"
import userAuthReducer from "./states/user.state"

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
import sessionStorage from 'redux-persist/lib/storage/session';

export interface AppStore {
    auth: Auth; // Añade otros estados aquí según sea necesario
    userAuth: UserAuth;
}

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ["auth", "userAuth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    userAuth: userAuthReducer
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