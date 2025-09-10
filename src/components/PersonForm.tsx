import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personSchema, type PersonFormValues } from '../validation/personSchema'

type Props = {
  defaultValues?: Partial<PersonFormValues>
  onSubmit: (values: PersonFormValues) => void
  submitting?: boolean
}

export default function PersonForm({ defaultValues, onSubmit, submitting=false }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      ...defaultValues
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Nombre</label>
          <input className="input" placeholder="John" {...register('firstName')} />
          {errors.firstName && <p className="text-danger text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="label">Apellido</label>
          <input className="input" placeholder="Doe" {...register('lastName')} />
          {errors.lastName && <p className="text-danger text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Email</label>
        <input className="input" placeholder="john.doe@email.com" {...register('email')} />
        {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Calle</label>
          <input className="input" placeholder="Cra 00 #00-00" {...register('address.street')} />
        </div>
        <div>
          <label className="label">Ciudad</label>
          <input className="input" placeholder="Medellín" {...register('address.city')} />
        </div>
        <div>
          <label className="label">Departamento</label>
          <input className="input" placeholder="Antioquia" {...register('address.state')} />
        </div>
        <div>
          <label className="label">Código Postal</label>
          <input className="input" placeholder="050001" {...register('address.postalCode')} />
        </div>
        <div>
          <label className="label">Pais</label>
          <input className="input" placeholder="Colombia" {...register('address.country')} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
