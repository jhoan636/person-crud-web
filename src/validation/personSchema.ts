import { z } from 'zod'

export const personSchema = z.object({
  firstName: z.string({ required_error: 'El nombre es obligatorio' }).min(2).max(100),
  lastName:  z.string({ required_error: 'El apellido es obligatorio' }).min(2).max(100),
  email:     z.string({ required_error: 'El email es obligatorio' }).email('Email inválido'),
  active:    z.boolean().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional()
  }).optional()
})

export type PersonFormValues = z.infer<typeof personSchema>
