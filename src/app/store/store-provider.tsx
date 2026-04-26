import React, { useState, type ReactNode } from 'react';

import { createRootStore } from './root-store';
import { RootStoreContext } from './store-context';

interface RootStoreProviderProps {
  readonly children: ReactNode;
}

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
