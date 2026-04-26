import { Formik } from 'formik';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { memo } from 'react';
import type { FormikConfig } from 'formik/dist/types';
import type { GroupContactsDto } from '@entities/group';
import type { FilterFormValues } from '../model/types';

interface FilterFormProps extends FormikConfig<Partial<FilterFormValues>> {
  groupContactsList: GroupContactsDto[];
  onResetFilters?: () => void;
}

export const FilterForm = memo<FilterFormProps>(
  ({
    onSubmit,
    initialValues = {},
    enableReinitialize = false,
    groupContactsList,
    onResetFilters,
  }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {({ handleChange, handleSubmit, resetForm, values }) => (
          <Form onSubmit={handleSubmit} onChange={handleSubmit}>
            <Row xxl={4} className="g-4">
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    id={'name'}
                    name={'name'}
                    onChange={handleChange}
                    value={values.name ?? ''}
                    placeholder="name"
                    aria-label="name"
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Select
                  id={'groupId'}
                  name={'groupId'}
                  aria-label="Поиск по группе"
                  onChange={handleChange}
                  value={values.groupId ?? ''}
                >
                  <option value="">Open this select menu</option>
                  {groupContactsList.map((groupContacts) => (
                    <option value={groupContacts.id} key={groupContacts.id}>
                      {groupContacts.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Button variant={'primary'} type={'submit'}>
                  Применить
                </Button>
              </Col>
              <Col>
                <Button
                  variant={'outline-secondary'}
                  type={'button'}
                  onClick={() => {
                    resetForm();
                    onResetFilters?.();
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  },
);
