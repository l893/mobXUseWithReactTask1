import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@app';
import { RootStoreProvider } from '@app/store';
import './index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </StrictMode>,
);
