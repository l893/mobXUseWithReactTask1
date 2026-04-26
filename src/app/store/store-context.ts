import { createContext, useContext } from 'react';

import type { RootStore } from './root-store';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = (): RootStore => {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore) {
    throw new Error('useRootStore must be used within RootStoreProvider.');
  }

  return rootStore;
};
