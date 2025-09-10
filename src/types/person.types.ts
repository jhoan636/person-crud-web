export interface AddressDTO {
  id?: number;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface PersonDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: AddressDTO;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PersonFormData {
  firstName: string;
  lastName: string;
  email: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}