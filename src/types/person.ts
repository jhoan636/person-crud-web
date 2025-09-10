export type AddressDTO = {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string

}

export type PersonDTO = {
  id?: number
  firstName: string
  lastName: string
  email: string
  address?: AddressDTO
}
