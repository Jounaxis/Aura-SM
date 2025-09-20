// src/routes/Consultas/Consultas.tsx
import React from 'react'

const Consultas: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
        Minhas Consultas
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Consultas</h2>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Consulta com Dr. Carlos Silva</h3>
                <p className="text-gray-600">Cardiologia</p>
                <p className="text-gray-600">15/09/2023 às 14:00</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmada</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                Ver Detalhes
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                Cancelar
              </button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Consulta com Dra. Ana Santos</h3>
                <p className="text-gray-600">Neurologia</p>
                <p className="text-gray-600">20/09/2023 às 10:30</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pendente</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                Confirmar
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Consultas Anteriores</h2>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Consulta com Dr. Pedro Almeida</h3>
                <p className="text-gray-600">Ortopedia</p>
                <p className="text-gray-600">05/08/2023 às 16:00</p>
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Realizada</span>
            </div>
            <div className="mt-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                Ver Laudo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultas