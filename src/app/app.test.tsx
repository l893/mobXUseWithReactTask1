import { render, screen } from '@testing-library/react';
import { App } from './app';
import { RootStoreProvider } from '@app/store';

test('renders app title', () => {
  render(
    <RootStoreProvider>
      <App />
    </RootStoreProvider>,
  );
  const titleElement = screen.getByText(/Книга контактов/i);
  expect(titleElement).toBeInTheDocument();
});
