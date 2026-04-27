import type { ContactDto } from '@entities/contact';
import type { GroupContactsDto } from '@entities/group';

import {
  CONTACTS_ENDPOINT,
  GROUPS_ENDPOINT,
  MOCKI_BASE_URL,
} from './contacts-api.constants';

async function requestJson<ResponseData>(
  endpoint: string,
): Promise<ResponseData> {
  const response = await fetch(`${MOCKI_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  return (await response.json()) as ResponseData;
}

export const fetchContacts = (): Promise<ContactDto[]> => {
  return requestJson<ContactDto[]>(CONTACTS_ENDPOINT);
};

export const fetchGroups = (): Promise<GroupContactsDto[]> => {
  return requestJson<GroupContactsDto[]>(GROUPS_ENDPOINT);
};
