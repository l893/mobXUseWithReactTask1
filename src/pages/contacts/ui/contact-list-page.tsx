import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@app/store';
import { ContactCard } from '@entities/contact';
import {
  applyContactFilters,
  FilterForm,
  type FilterFormValues,
} from '@features/filters';
import { Empty } from '@shared/ui/empty';

export const ContactListPage = observer((): React.JSX.Element => {
  const { contactsStore, favoritesStore, filtersStore, groupsStore } =
    useRootStore();

  const contacts = contactsStore.contacts;
  const groupContactsList = groupsStore.groupContactsList;
  const isDataLoading = contactsStore.isLoading || groupsStore.isLoading;
  const hasDataLoadingError = contactsStore.hasError || groupsStore.hasError;
  const filteredContacts = applyContactFilters({
    contacts,
    groupContactsList,
    filters: filtersStore.filters,
  });

  useEffect(() => {
    if (contactsStore.status === 'idle') {
      void contactsStore.loadContacts();
    }

    if (groupsStore.status === 'idle') {
      void groupsStore.loadGroups();
    }
  }, [contactsStore, groupsStore]);

  const handleFiltersSubmit = (filterValues: Partial<FilterFormValues>) => {
    filtersStore.setFilters(filterValues);
  };

  const handleResetFilters = () => {
    filtersStore.resetFilters();
  };

  const handleToggleFavorite = (contactId: string) => {
    favoritesStore.toggleFavoriteContactId(contactId);
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
          initialValues={filtersStore.filterFormInitialValues}
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
                  isFavorite={favoritesStore.isFavorite(contact.id)}
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
});
