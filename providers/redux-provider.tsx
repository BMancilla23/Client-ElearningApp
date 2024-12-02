"use client";

import { store } from "@/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { type Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

interface ProviderProps {
  children: ReactNode;
}

/* const persistor = persistStore(store); */

/* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider> */

export function ReduxProvider({ children }: ProviderProps) {
  // Referencias para el store y el persistor
  const storeRef = useRef<typeof store | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  // Inicializar el store y el persistor si no hay referencias
  if (!storeRef.current) {
    storeRef.current = store;
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
