import type { ContactDto } from '@entities/contact';
import type { GroupContactsDto } from '@entities/group';
import type { FiltersState } from '@features/filters/model/filters';

interface ApplyContactFiltersParams {
  contacts: ContactDto[];
  groupContactsList: GroupContactsDto[];
  filters: FiltersState;
}

export function applyContactFilters({
  contacts,
  groupContactsList,
  filters,
}: ApplyContactFiltersParams): ContactDto[] {
  let filteredContacts = contacts;

  const nameQuery = filters.nameQuery.trim().toLowerCase();
  if (nameQuery) {
    filteredContacts = filteredContacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameQuery),
    );
  }

  const groupId = filters.groupId;
  if (groupId) {
    const foundGroup = groupContactsList.find((groupContacts) => {
      return groupContacts.id === groupId;
    });

    if (foundGroup) {
      filteredContacts = filteredContacts.filter((contact) => {
        return foundGroup.contactIds.includes(contact.id);
      });
    }
  }

  return filteredContacts;
}
