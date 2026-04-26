import { render, screen } from '@testing-library/react';
import { App } from './app';
import { Provider } from 'react-redux';
import { store } from '@app/store';

test('renders app title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const titleElement = screen.getByText(/Книга контактов/i);
  expect(titleElement).toBeInTheDocument();
});
