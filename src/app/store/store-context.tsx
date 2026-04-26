import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { createRootStore, type RootStore } from './root-store';

interface RootStoreProviderProps {
  readonly children: ReactNode;
}

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = ({
  children,
}: RootStoreProviderProps): React.JSX.Element => {
  const [rootStore] = useState(() => createRootStore());

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = (): RootStore => {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore) {
    throw new Error('useRootStore must be used within RootStoreProvider.');
  }

  return rootStore;
};
