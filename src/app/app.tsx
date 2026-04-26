import React from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@widgets/layout';
import {
  ContactListPage,
  GroupPage,
  ContactPage,
  FavoritListPage,
  GroupListPage,
} from '@pages';

export const App = (): React.JSX.Element => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ContactListPage />} />
            <Route path="contact">
              <Route index element={<ContactListPage />} />
              <Route path=":contactId" element={<ContactPage />} />
            </Route>
            <Route path="groups">
              <Route index element={<GroupListPage />} />
              <Route path=":groupId" element={<GroupPage />} />
            </Route>
            <Route path="favorit" element={<FavoritListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
