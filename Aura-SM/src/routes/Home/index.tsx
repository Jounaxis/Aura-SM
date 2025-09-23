// src/routes/Home/Home.tsx
import React from 'react'

const Home: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
        Portal de Auto-Atendimento
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Cards de funcionalidades */}
        <div className="bg-white rounded-lg shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Minhas Consultas</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Visualize e gerencie suas consultas agendadas. Confirmações e cancelamentos podem ser feitos aqui.
          </p>
          <a href="#consultas" className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition">
            Acessar
          </a>
        </div>
        
        {/* Adicione os outros cards similares */}
      </div>
    </main>
  )
}

export default Home