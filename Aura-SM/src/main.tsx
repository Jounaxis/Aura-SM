import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./globals.css"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home/index.jsx'
import Agendar from './routes/Agendar/index.js'
import Consultas from './routes/Consultas/index.jsx'
import Historico from './routes/Historico/indedx.tsx'
import EditarConsulta from './routes/EditarConsulta/index.tsx'
import Integrantes from './routes/Integrantes/index.tsx'
import Faq from './routes/Faq/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import Contato from './routes/Contato/index.tsx'
import Error from './routes/Error/index.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/agendar", element: <Agendar/>},
      {path: "/consultas", element: <Consultas/>},
      {path: "/editar/consulta/:id", element: <EditarConsulta/>},
      {path: "/historico", element: <Historico/>},
      {path: "/integrantes", element: <Integrantes/>},
      {path: "/sobre", element: <Sobre/>},
      {path: "/contato", element: <Contato/>},
      {path: "/faq", element: <Faq/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


