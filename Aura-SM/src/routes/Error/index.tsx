// src/routes/Error/Error.tsx
import React from 'react'
import { useRouteError, Link } from 'react-router-dom'

const Error: React.FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string }
  console.error(error)

  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}

export default Error