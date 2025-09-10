import { describe, it, expect } from 'vitest'
import { apiUrl } from '../api/http'

describe('apiUrl', () => {
  it('builds complete URL with base', () => {
    const prev = import.meta.env.VITE_API_BASE_URL
    // @ts-ignore
    import.meta.env.VITE_API_BASE_URL = 'http://localhost:8080'
    expect(apiUrl('/v1/persons')).toBe('http://localhost:8080/v1/persons')
    // @ts-ignore
    import.meta.env.VITE_API_BASE_URL = prev
  })
})
