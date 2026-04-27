import { makeAutoObservable } from 'mobx';

import type { FilterFormValues } from './types';

export interface ContactFilters {
  nameQuery: string;
  groupId: string;
}

const initialFilters: ContactFilters = {
  nameQuery: '',
  groupId: '',
};

export class FiltersStore {
  nameQuery = initialFilters.nameQuery;
  groupId = initialFilters.groupId;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get filters(): ContactFilters {
    return {
      nameQuery: this.nameQuery,
      groupId: this.groupId,
    };
  }

  get filterFormInitialValues(): Partial<FilterFormValues> {
    return {
      name: this.nameQuery,
      groupId: this.groupId,
    };
  }

  setFilters(filterValues: Partial<FilterFormValues>): void {
    this.nameQuery = filterValues.name ?? '';
    this.groupId = filterValues.groupId ?? '';
  }

  resetFilters(): void {
    this.nameQuery = initialFilters.nameQuery;
    this.groupId = initialFilters.groupId;
  }
}
