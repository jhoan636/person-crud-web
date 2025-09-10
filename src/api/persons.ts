import { http } from './http'
import type { Person } from '../types/person'

const base = '/v1/persons'

export async function listPersons(): Promise<Person[]> {
  const { data } = await http.get<Person[]>(base)
  return data
}

export async function getPerson(id: number): Promise<Person> {
  const { data } = await http.get<Person>(`${base}/${id}`)
  return data
}

export async function createPerson(payload: Person): Promise<Person> {
  const { data } = await http.post<Person>(base, payload)
  return data
}

export async function updatePerson(id: number, payload: Person): Promise<Person> {
  const { data } = await http.put<Person>(`${base}/${id}`, payload)
  return data
}

export async function removePerson(id: number): Promise<void> {
  await http.delete(`${base}/${id}`)
}

export async function searchPersonsByName(name: string): Promise<Person[]> {
  const { data } = await http.get<Person[]>(`${base}/search`, { params: { name } })
  return data
}
