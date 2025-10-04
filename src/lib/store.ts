import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { persistReducer, persistStore } from 'redux-persist'
import { AuthState } from './features/auth/authSlice'
import { AlertState } from './features/alert/alertSlice'
import alertReducer from './features/alert/alertSlice'

export interface RootStateType {
    auth: AuthState,
    alert: AlertState,
}


const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
})

const encryptor = encryptTransform({
    secretKey: process.env.NEXT_PUBLIC_REDUX_ENCRYPTION_KEY || "",
    onError: function (error) {
        // Handle encryption/decryption errors
        console.error('Encryption error:', error);
    },
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    blacklist: [],
    transforms: [encryptor],
}

const persistedReducer = persistReducer<RootStateType>(persistConfig, rootReducer)

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    })

    const persistor = persistStore(store)

    return { store, persistor }
}

let storeInstance: ReturnType<typeof makeStore> | null = null

export const getStore = () => {
    if (!storeInstance) {
        storeInstance = makeStore()
    }
    return storeInstance
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>['store']
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']