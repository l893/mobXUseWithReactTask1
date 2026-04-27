import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@app/store';
import { GroupContactsCard } from '@entities/group';
import { Empty } from '@shared/ui/empty';
import { ContactCard } from '@entities/contact';

export const GroupPage = observer((): React.JSX.Element => {
  const { groupId } = useParams<{ groupId: string }>();
  const { contactsStore, favoritesStore, groupsStore } = useRootStore();
  const selectedGroupId = groupId ?? '';

  const isDataLoading = contactsStore.isLoading || groupsStore.isLoading;
  const hasDataLoadingError = contactsStore.hasError || groupsStore.hasError;
  const groupContacts = groupsStore.getGroupContactsById(selectedGroupId);
  const groupContactsMembers = groupContacts
    ? contactsStore.contacts.filter((contact) => {
        return groupContacts.contactIds.includes(contact.id);
      })
    : [];

  useEffect(() => {
    if (groupsStore.status === 'idle') {
      void groupsStore.loadGroups();
    }

    if (contactsStore.status === 'idle') {
      void contactsStore.loadContacts();
    }
  }, [contactsStore, groupsStore]);

  const handleToggleFavorite = (contactId: string) => {
    favoritesStore.toggleFavoriteContactId(contactId);
  };

  if (isDataLoading) {
    return (
      <Row>
        <Col>Загрузка группы...</Col>
      </Row>
    );
  }

  if (hasDataLoadingError) {
    return (
      <Row>
        <Col>Не удалось загрузить группу или контакты.</Col>
      </Row>
    );
  }

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {groupContactsMembers.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard
                    contact={contact}
                    withLink
                    isFavorite={favoritesStore.isFavorite(contact.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
