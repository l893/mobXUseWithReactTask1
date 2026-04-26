import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ContactDto } from '@entities/contact';
import type { GroupContactsDto } from '@entities/group';

import {
  CONTACTS_ENDPOINT,
  GROUPS_ENDPOINT,
  MOCKI_BASE_URL,
} from './contacts-api.constants';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MOCKI_BASE_URL,
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => CONTACTS_ENDPOINT,
    }),
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => GROUPS_ENDPOINT,
    }),
  }),
});

export const { useGetContactsQuery, useGetGroupsQuery } = contactsApi;
