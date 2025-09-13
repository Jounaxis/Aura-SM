import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home/index.jsx'
import Agendas from './routes/Agendas/index.jsx'
import Consultas from './routes/Consultas/index.jsx'
import Error from './routes/Error/index.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/Agendas", element: <Agendas/>},
      {path: "/Consultas", element: <Consultas/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


