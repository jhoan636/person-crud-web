# Gestor de Personas(Frontend)🚀

Aplicación React + Vite + TypeScript para gestionar personas (CRUD) y visualizar información relacionada.
Incluye TailwindCSS, React Router, Axios, React-Hook-Form + Zod (validaciones), toasts y un diseño dark

## 📋 Características
✔️Arquitectura limpia y tipada (TypeScript)

✔️CRUD completo de personas (Crear, Leer, Actualizar, Eliminar)

✔️Validaciones de formularios con React-Hook-Form y Zod

✔️Rutas protegidas con React Router

✔️Notificaciones con react-hot-toast

✔️Diseño responsivo con TailwindCSS

✔️Modo oscuro (dark mode)

✔️Consumo de API REST con Axios

---
## 📦 Instalación y Ejecución Local

### 🔗 1. Clonar y configurar el entorno

⚡ Ejecuta el siguiente comando para clonar un repositorio **Git remoto**:

```bash
git clone https://github.com/jhoan636/person-crud-web.git
```

⚡ Ejecuta el siguiente comando para entrar al directorio:

```bash
cd person-crud-web
```

⚡ Ejecuta el siguiente comando para instalar las dependencias:

```bash
pnpm install
```

### 🚀 2. Ejecutar la aplicación
⚡ Ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:

```bash
pnpm dev
```

⚡ Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en acción.  

### ⚙️ 2. Configura variables de entorno
⚡ Crea un archivo `.env.local` en la raíz del proyecto y define las siguientes variables de entorno:

```env
VITE_API_BASE_URL = pon tu URL de la API
```