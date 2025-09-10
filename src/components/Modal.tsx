import { ReactNode, useEffect } from 'react'
type Props = { open: boolean, onClose: () => void, title: string, children: ReactNode, footer?: ReactNode }

export default function Modal({ open, onClose, title, children, footer }: Props) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if(e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="card w-full max-w-2xl">
        <header className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="btn btn-ghost" onClick={onClose}>✕</button>
        </header>
        <div className="p-4">{children}</div>
        {footer && <footer className="p-4 border-t border-slate-800 flex justify-end gap-2">{footer}</footer>}
    </div>
  </div>
  )
}
