import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard, type ContactDto } from '@entities/contact';
import { Empty } from '@shared/ui/empty';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';
import { useGetContactsQuery } from '@shared/api';

const EMPTY_CONTACTS: ContactDto[] = [];

export const ContactPage = (): React.JSX.Element => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();
  const contactsQuery = useGetContactsQuery();
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const contacts = contactsQuery.data ?? EMPTY_CONTACTS;
  const selectedContactId = contactId ?? '';
  const contact = useMemo(() => {
    return contacts.find((currentContact) => {
      return currentContact.id === selectedContactId;
    });
  }, [contacts, selectedContactId]);

  const handleToggleFavorite = (selectedContactId: string) => {
    dispatch(toggleFavoriteContactId(selectedContactId));
  };

  if (contactsQuery.isLoading) {
    return (
      <Row>
        <Col>Загрузка контакта...</Col>
      </Row>
    );
  }

  if (contactsQuery.isError) {
    return (
      <Row>
        <Col>Не удалось загрузить контакт.</Col>
      </Row>
    );
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? (
          <ContactCard
            contact={contact}
            isFavorite={favoriteContactIds.includes(contact.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};
