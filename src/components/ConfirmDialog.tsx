import Modal from './Modal'

type Props = {
  open: boolean
  title?: string
  message: string
  onCancel: () => void
  onConfirm: () => void
  confirmText?: string
}

export default function ConfirmDialog({ open, title='Confirmar', message, onCancel, onConfirm, confirmText='Sí, continuar' }: Props) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-muted">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
        <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
      </div>
    </Modal>
  )
}
