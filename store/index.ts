import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

/* import storage from "redux-persist/lib/storage"; */

// Importamos reducers
import authReducer from "./auth/authSlice";
import storage from "./ssr-safe-storage";
/* import storage from "./ssr-safe-storage"; */

// Detectar si estamos en el cliente
/* const isClient = typeof window !== "undefined"; */

// Reducer principal
/* let mainReducer; */

// Configuración condicional
/* if (isClient) {
  // Configuración de persistencia
  const authPersistConfig = {
    key: "auth",
    storage, // Usar almacenamiento en cliente
    whitelist: ["accessToken", "user"], // Persistir solo accessToken y user
  };
  // Reducer persistido para auth
  const persistedAuthReducer = persistReducer<AuthPersistedState>(
    authPersistConfig,
    authReducer
  );

  // Combinar reducers con persistencia
  mainReducer = combineReducers({
    auth: persistedAuthReducer,
  });
} else {
  mainReducer = combineReducers({
    auth: authReducer,
  });
} */

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Reducers a persistir
};

// reducers combinados
const rootReducer = combineReducers({
  auth: authReducer,
});

// Reducer persitido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store

/* export const store = () =>
  configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, //Desactiva la verificación de serialización para redux persist
      }),
  }); */

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignorar serialización para redux-persist
    }),
});

// Tipos para typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/* export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"]; */
