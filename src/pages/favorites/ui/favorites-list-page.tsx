import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@app/store';
import { ContactCard } from '@entities/contact';
import { Empty } from '@shared/ui/empty';

export const FavoritListPage = observer((): React.JSX.Element => {
  const { contactsStore, favoritesStore } = useRootStore();

  const favoriteContacts = contactsStore.contacts.filter((contact) => {
    return favoritesStore.favoriteContactIdSet.has(contact.id);
  });

  useEffect(() => {
    if (contactsStore.status === 'idle') {
      void contactsStore.loadContacts();
    }
  }, [contactsStore]);

  const handleToggleFavorite = (contactId: string) => {
    favoritesStore.toggleFavoriteContactId(contactId);
  };

  if (contactsStore.isLoading) {
    return (
      <Row>
        <Col>Загрузка избранных контактов...</Col>
      </Row>
    );
  }

  if (contactsStore.hasError) {
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
});
