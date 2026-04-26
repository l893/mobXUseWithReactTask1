import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard, type ContactDto } from '@entities/contact';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';
import { useGetContactsQuery } from '@shared/api';
import { Empty } from '@shared/ui/empty';

const EMPTY_CONTACTS: ContactDto[] = [];

export const FavoritListPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const contactsQuery = useGetContactsQuery();
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const contacts = contactsQuery.data ?? EMPTY_CONTACTS;
  const favoriteContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return favoriteContactIds.includes(contact.id);
    });
  }, [contacts, favoriteContactIds]);

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
  };

  if (contactsQuery.isLoading) {
    return (
      <Row>
        <Col>Загрузка избранных контактов...</Col>
      </Row>
    );
  }

  if (contactsQuery.isError) {
    return (
      <Row>
        <Col>Не удалось загрузить избранные контакты.</Col>
      </Row>
    );
  }

  if (favoriteContacts.length === 0) {
    return <Empty />;
  }

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard
            contact={contact}
            withLink
            isFavorite
            onToggleFavorite={handleToggleFavorite}
          />
        </Col>
      ))}
    </Row>
  );
};
