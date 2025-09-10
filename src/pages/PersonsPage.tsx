import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import PersonForm from '../components/PersonForm'
import type { PersonDTO } from '../types/person'
import { listPersons, createPerson, updatePerson, removePerson, searchPersonsByName } from '../api/persons'

export default function PersonsPage() {
  const [persons, setPersons] = useState<PersonDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<PersonDTO | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean, id?: number }>({ open: false })

  async function fetchData() {
    setLoading(true)
    try {
      const data = query ? await searchPersonsByName(query) : await listPersons()
      setPersons(data)
      setError(null)
    } catch (e: any) {
      setError(e.message || 'Error al obtener personas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  async function handleCreate(values: any) {
    try {
      const p = await createPerson(values)
      setPersons(prev => [p, ...prev])
      toast.success('Persona creada')
      setOpenForm(false)
    } catch (e: any) {
      console.log(e)
      toast.error(e.message || 'Error al crear')
    }
  }

  async function handleUpdate(values: any) {
    if (!editing?.id) return
    try {
      const updated = await updatePerson(editing.id, values)
      setPersons(prev => prev.map(p => p.id === editing.id ? updated : p))
      toast.success('Persona actualizada')
      setOpenForm(false)
      setEditing(null)
    } catch (e: any) {
      toast.error(e.message || 'Error al actualizar')
    }
  }

  async function handleDelete() {
    if (!confirmDelete.id) return
    try {
      await removePerson(confirmDelete.id)
      setPersons(prev => prev.filter(p => p.id !== confirmDelete.id))
      toast.success('Eliminado')
    } catch (e: any) {
      toast.error(e.message || 'No se pudo eliminar')
    } finally {
      setConfirmDelete({ open: false })
    }
  }

  const header = useMemo(() => (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold">Informe de personas</h2>
        <p className="text-sm text-muted">Sistema de recolección de personas</p>
      </div>
      <div className="flex gap-2">
        <input className="input w-64" placeholder="Buscar por nombre..." value={query} onChange={e => setQuery(e.target.value)} />
        <button className="btn btn-ghost" onClick={fetchData}>Buscar</button>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setOpenForm(true) }}>+ Nueva Persona</button>
      </div>
    </div>
  ), [query])

  return (
    <section className="card p-6">
      {header}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-slate-800">
              <th className="py-2">ID</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Apellido</th>
              <th className="py-2">Email</th>
              <th className="py-2">Dirección</th>
              <th className="py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="py-6 text-center text-muted">Cargando personas...</td></tr>
            )}
            {!loading && error && (
              <tr><td colSpan={6} className="py-6 text-center text-danger">{error}</td></tr>
            )}
            {!loading && !error && persons.length === 0 && (
              <tr><td colSpan={6} className="py-6 text-center text-muted">Sin registros</td></tr>
            )}
            {!loading && !error && persons.map(p => (
              <tr key={p.id} className="border-b border-slate-800">
                <td className="py-2">{p.id}</td>
                <td className="py-2">{p.firstName}</td>
                <td className="py-2">{p.lastName}</td>
                <td className="py-2">{p.email}</td>
                <td className="py-2">
                  {p.address ? (
                    <div className="leading-tight">
                      <div>{p.address.street || '-'}</div>
                      <div className="text-xs text-muted">
                        {[p.address.city, p.address.state, p.address.postalCode]
                          .filter(Boolean)
                          .join(' • ')}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={() => { setEditing(p); setOpenForm(true) }}>Editar</button>
                    <button className="btn btn-danger" onClick={() => setConfirmDelete({ open: true, id: p.id })}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openForm}
        onClose={() => { setOpenForm(false); setEditing(null) }}
        title={editing ? 'Editar Persona' : 'Nueva Persona'}
        footer={null}
      >
        <PersonForm
          defaultValues={editing || undefined}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete.open}
        message="Esta acción eliminará la persona seleccionada. ¿Deseas continuar?"
        onCancel={() => setConfirmDelete({ open: false })}
        onConfirm={handleDelete}
      />
    </section>
  )
}
