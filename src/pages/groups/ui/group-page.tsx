import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard, type GroupContactsDto } from '@entities/group';
import { Empty } from '@shared/ui/empty';
import { ContactCard, type ContactDto } from '@entities/contact';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';
import { useGetContactsQuery, useGetGroupsQuery } from '@shared/api';

const EMPTY_CONTACTS: ContactDto[] = [];
const EMPTY_GROUP_CONTACTS: GroupContactsDto[] = [];

export const GroupPage = (): React.JSX.Element => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const contactsQuery = useGetContactsQuery();
  const groupsQuery = useGetGroupsQuery();
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const contacts = contactsQuery.data ?? EMPTY_CONTACTS;
  const groupContactsList = groupsQuery.data ?? EMPTY_GROUP_CONTACTS;
  const selectedGroupId = groupId ?? '';
  const isDataLoading = contactsQuery.isLoading || groupsQuery.isLoading;
  const hasDataLoadingError = contactsQuery.isError || groupsQuery.isError;
  const groupContacts = useMemo(() => {
    return groupContactsList.find((currentGroup) => {
      return currentGroup.id === selectedGroupId;
    });
  }, [groupContactsList, selectedGroupId]);

  const groupContactsMembers = useMemo(() => {
    if (!groupContacts) {
      return [];
    }

    return contacts.filter((contact) => {
      return groupContacts.contactIds.includes(contact.id);
    });
  }, [contacts, groupContacts]);

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
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
                    isFavorite={favoriteContactIds.includes(contact.id)}
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
};
