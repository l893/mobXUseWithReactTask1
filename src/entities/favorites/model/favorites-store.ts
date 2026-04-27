import { makeAutoObservable } from 'mobx';
import type { ContactDto } from '@entities/contact';

import type { FavoriteContactsDto } from './types';

const FAVORITE_CONTACT_IDS_STORAGE_KEY = 'contacts.favoriteContactIds';

function readFavoriteContactIdsFromStorage(): FavoriteContactsDto {
  try {
    const serializedFavoriteContactIds = localStorage.getItem(
      FAVORITE_CONTACT_IDS_STORAGE_KEY,
    );

    if (!serializedFavoriteContactIds) {
      return [];
    }

    const parsedFavoriteContactIds: unknown = JSON.parse(
      serializedFavoriteContactIds,
    );

    if (!Array.isArray(parsedFavoriteContactIds)) {
      return [];
    }

    return parsedFavoriteContactIds.filter(
      (favoriteContactId): favoriteContactId is ContactDto['id'] => {
        return typeof favoriteContactId === 'string';
      },
    );
  } catch {
    return [];
  }
}

export class FavoritesStore {
  favoriteContactIds: FavoriteContactsDto = readFavoriteContactIdsFromStorage();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get favoriteContactIdSet(): ReadonlySet<ContactDto['id']> {
    return new Set(this.favoriteContactIds);
  }

  isFavorite(contactId: ContactDto['id']): boolean {
    return this.favoriteContactIdSet.has(contactId);
  }

  setFavoriteContactIds(favoriteContactIds: FavoriteContactsDto): void {
    this.favoriteContactIds = favoriteContactIds;
    this.saveFavoriteContactIds();
  }

  toggleFavoriteContactId(contactId: ContactDto['id']): void {
    if (this.isFavorite(contactId)) {
      this.favoriteContactIds = this.favoriteContactIds.filter(
        (favoriteContactId) => {
          return favoriteContactId !== contactId;
        },
      );
      this.saveFavoriteContactIds();
      return;
    }

    this.favoriteContactIds.push(contactId);
    this.saveFavoriteContactIds();
  }

  private saveFavoriteContactIds(): void {
    localStorage.setItem(
      FAVORITE_CONTACT_IDS_STORAGE_KEY,
      JSON.stringify(this.favoriteContactIds),
    );
  }
}
