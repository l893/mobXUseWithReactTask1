import type { ContactDto } from '@entities/contact';

export interface GroupContactsDto {
  id: string;
  name: string;
  description: string;
  photo: string;
  contactIds: ContactDto['id'][];
}
