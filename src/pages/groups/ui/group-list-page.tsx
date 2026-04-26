import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from '@entities/group';
import { Empty } from '@shared/ui/empty';
import { useGetGroupsQuery } from '@shared/api';

export const GroupListPage = (): React.JSX.Element => {
  const groupsQuery = useGetGroupsQuery();
  const groupContactsList = groupsQuery.data ?? [];

  if (groupsQuery.isLoading) {
    return (
      <Row>
        <Col>Загрузка групп...</Col>
      </Row>
    );
  }

  if (groupsQuery.isError) {
    return (
      <Row>
        <Col>Не удалось загрузить группы.</Col>
      </Row>
    );
  }

  if (groupContactsList.length === 0) {
    return <Empty />;
  }

  return (
    <Row xxl={4}>
      {groupContactsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
};
