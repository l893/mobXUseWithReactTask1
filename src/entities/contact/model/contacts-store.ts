import { flow, makeAutoObservable } from 'mobx';
import { fetchContacts } from '@shared/api';
import type { RequestStatus } from '@shared/api/request-status';

import type { ContactDto } from './types';

export class ContactsStore {
  contacts: ContactDto[] = [];
  status: RequestStatus = 'idle';
  errorMessage = '';

  constructor() {
    makeAutoObservable(
      this,
      {
        loadContacts: flow,
      },
      { autoBind: true },
    );
  }

  get isLoading(): boolean {
    return this.status === 'loading';
  }

  get hasError(): boolean {
    return this.status === 'error';
  }

  get hasContacts(): boolean {
    return this.contacts.length > 0;
  }

  getContactById(contactId: ContactDto['id']): ContactDto | undefined {
    return this.contacts.find((contact) => {
      return contact.id === contactId;
    });
  }

  *loadContacts(): Generator<Promise<ContactDto[]>, void, ContactDto[]> {
    this.status = 'loading';
    this.errorMessage = '';

    try {
      const contacts = yield fetchContacts();

      this.contacts = contacts;
      this.status = 'success';
    } catch (error) {
      this.contacts = [];
      this.status = 'error';
      this.errorMessage =
        error instanceof Error ? error.message : 'Failed to load contacts.';
    }
  }
}
