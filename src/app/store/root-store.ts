import { configure, makeAutoObservable } from 'mobx';
import { ContactsStore } from '@entities/contact';
import { FavoritesStore } from '@entities/favorites';
import { GroupsStore } from '@entities/group';
import { FiltersStore } from '@features/filters';

let isMobxConfigured = false;

export class RootStore {
  readonly contactsStore: ContactsStore;
  readonly groupsStore: GroupsStore;
  readonly favoritesStore: FavoritesStore;
  readonly filtersStore: FiltersStore;

  constructor() {
    this.contactsStore = new ContactsStore();
    this.groupsStore = new GroupsStore();
    this.favoritesStore = new FavoritesStore();
    this.filtersStore = new FiltersStore();

    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export function configureMobx(): void {
  if (isMobxConfigured) {
    return;
  }

  configure({
    enforceActions: 'observed',
  });

  isMobxConfigured = true;
}

export function createRootStore(): RootStore {
  configureMobx();

  return new RootStore();
}
