import { flow, makeAutoObservable } from 'mobx';
import { fetchGroups } from '@shared/api';
import type { RequestStatus } from '@shared/api/request-status';

import type { GroupContactsDto } from './types';

export class GroupsStore {
  groupContactsList: GroupContactsDto[] = [];
  status: RequestStatus = 'idle';
  errorMessage = '';

  constructor() {
    makeAutoObservable(
      this,
      {
        loadGroups: flow,
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

  get hasGroups(): boolean {
    return this.groupContactsList.length > 0;
  }

  getGroupContactsById(
    groupContactsId: GroupContactsDto['id'],
  ): GroupContactsDto | undefined {
    return this.groupContactsList.find((groupContacts) => {
      return groupContacts.id === groupContactsId;
    });
  }

  *loadGroups(): Generator<
    Promise<GroupContactsDto[]>,
    void,
    GroupContactsDto[]
  > {
    this.status = 'loading';
    this.errorMessage = '';

    try {
      const groupContactsList = yield fetchGroups();

      this.groupContactsList = groupContactsList;
      this.status = 'success';
    } catch (error) {
      this.groupContactsList = [];
      this.status = 'error';
      this.errorMessage =
        error instanceof Error ? error.message : 'Failed to load groups.';
    }
  }
}
