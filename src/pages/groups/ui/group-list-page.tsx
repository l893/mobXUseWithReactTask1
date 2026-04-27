import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@app/store';
import { GroupContactsCard } from '@entities/group';
import { Empty } from '@shared/ui/empty';

export const GroupListPage = observer((): React.JSX.Element => {
  const { groupsStore } = useRootStore();
  const groupContactsList = groupsStore.groupContactsList;

  useEffect(() => {
    if (groupsStore.status === 'idle') {
      void groupsStore.loadGroups();
    }
  }, [groupsStore]);

  if (groupsStore.isLoading) {
    return (
      <Row>
        <Col>Загрузка групп...</Col>
      </Row>
    );
  }

  if (groupsStore.hasError) {
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
});
