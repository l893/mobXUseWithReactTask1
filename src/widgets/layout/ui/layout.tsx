import { Outlet, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { MainMenu } from '@widgets/main-menu';
import { Breadcrumbs } from '@widgets/breadcrumbs';

export const Layout = (): React.JSX.Element => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((segment) => segment);

  return (
    <Container>
      <Row>
        <Col xxl={12}>
          <MainMenu />
        </Col>
        <Col xxl={12}>
          <Breadcrumbs pathNames={pathNames} />
        </Col>
        <Col xxl={12}>
          <Outlet />
        </Col>
        <Col xxl={12}>
          <footer />
        </Col>
      </Row>
    </Container>
  );
};
