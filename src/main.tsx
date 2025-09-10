import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import PersonsPage from './pages/PersonsPage'
import DashboardPage from './pages/DashboardPage'

function Layout() {
  return (
    <div>
      <header className="border-b border-slate-800 sticky top-0 bg-bg-dark/80 backdrop-blur z-10">
        <div className="container-app flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">🧩</div>
            <h1 className="text-lg font-semibold">Gestor de Personas</h1>
            <span className="text-xs text-muted">Gestión de Datos (CRUD)</span>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink to="/dashboard" className={({isActive}) => `nav-link ${isActive ? 'nav-active':''}`}>Panel de control</NavLink>
            <NavLink to="/persons" className={({isActive}) => `nav-link ${isActive ? 'nav-active':''}`}>Personas</NavLink>
          </nav>
        </div>
      </header>
      <main className="container-app">
        <Routes>
          <Route path="/" element={<Navigate to="/persons" />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
)
