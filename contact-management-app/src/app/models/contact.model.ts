export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateContactRequest {
  name: string;
  email: string;
  phone: string;
} 