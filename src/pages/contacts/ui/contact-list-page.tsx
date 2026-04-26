import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard, type ContactDto } from '@entities/contact';
import type { GroupContactsDto } from '@entities/group';
import {
  applyContactFilters,
  FilterForm,
  type FilterFormValues,
  resetFilters,
  selectFilters,
  setFilters,
} from '@features/filters';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';
import { useGetContactsQuery, useGetGroupsQuery } from '@shared/api';
import { Empty } from '@shared/ui/empty';

const EMPTY_CONTACTS: ContactDto[] = [];
const EMPTY_GROUP_CONTACTS: GroupContactsDto[] = [];

export const ContactListPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const contactsQuery = useGetContactsQuery();
  const groupsQuery = useGetGroupsQuery();
  const filters = useAppSelector(selectFilters);
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const contacts = contactsQuery.data ?? EMPTY_CONTACTS;
  const groupContactsList = groupsQuery.data ?? EMPTY_GROUP_CONTACTS;
  const isDataLoading = contactsQuery.isLoading || groupsQuery.isLoading;
  const hasDataLoadingError = contactsQuery.isError || groupsQuery.isError;
  const filterFormInitialValues: Partial<FilterFormValues> = {
    name: filters.nameQuery,
    groupId: filters.groupId,
  };
  const filteredContacts = useMemo(() => {
    return applyContactFilters({
      contacts,
      groupContactsList,
      filters,
    });
  }, [contacts, groupContactsList, filters]);

  const handleFiltersSubmit = (filterValues: Partial<FilterFormValues>) => {
    dispatch(setFilters(filterValues));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
  };

  if (isDataLoading) {
    return (
      <Row>
        <Col>Загрузка контактов...</Col>
      </Row>
    );
  }

  if (hasDataLoadingError) {
    return (
      <Row>
        <Col>Не удалось загрузить контакты или группы.</Col>
      </Row>
    );
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupContactsList}
          initialValues={filterFormInitialValues}
          enableReinitialize
          onSubmit={handleFiltersSubmit}
          onResetFilters={handleResetFilters}
        />
      </Col>
      <Col>
        {filteredContacts.length > 0 ? (
          <Row xxl={4} className="g-4">
            {filteredContacts.map((contact) => (
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
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};
