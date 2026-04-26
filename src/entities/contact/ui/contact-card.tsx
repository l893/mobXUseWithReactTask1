import { memo } from 'react';
import type { ContactDto } from '../model/types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (contactId: ContactDto['id']) => void;
}

export const ContactCard = memo<ContactCardProps>(
  ({
    contact: { photo, id, name, phone, birthday, address },
    withLink,
    isFavorite = false,
    onToggleFavorite,
  }) => {
    return (
      <Card key={id}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>
              {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
            </span>
            {onToggleFavorite ? (
              <Button
                type="button"
                variant="link"
                className="p-0 text-decoration-none"
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
                onClick={() => onToggleFavorite(id)}
              >
                {isFavorite ? '★' : '☆'}
              </Button>
            ) : null}
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to={`tel:${phone}`} target="_blank">
                  {phone}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  },
);
