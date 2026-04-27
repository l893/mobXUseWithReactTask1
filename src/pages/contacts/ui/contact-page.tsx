import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@app/store';
import { ContactCard } from '@entities/contact';
import { Empty } from '@shared/ui/empty';

export const ContactPage = observer((): React.JSX.Element => {
  const { contactId } = useParams<{ contactId: string }>();

  const { contactsStore, favoritesStore } = useRootStore();
  const selectedContactId = contactId ?? '';
  const contact = contactsStore.getContactById(selectedContactId);

  useEffect(() => {
    if (contactsStore.status === 'idle') {
      void contactsStore.loadContacts();
    }
  }, [contactsStore]);

  const handleToggleFavorite = (selectedContactId: string) => {
    favoritesStore.toggleFavoriteContactId(selectedContactId);
  };

  if (contactsStore.isLoading) {
    return (
      <Row>
        <Col>Загрузка контакта...</Col>
      </Row>
    );
  }

  if (contactsStore.hasError) {
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
            isFavorite={favoritesStore.isFavorite(contact.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
});
