// src/routes/Historico/Historico.tsx
import React from 'react'

const Historico: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
        Histórico Médico
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrar por período</h2>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <input 
              type="date" 
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Data inicial"
            />
            <input 
              type="date" 
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Data final"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Filtrar
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Data</th>
                <th className="py-2 px-4 text-left">Médico</th>
                <th className="py-2 px-4 text-left">Especialidade</th>
                <th className="py-2 px-4 text-left">Diagnóstico</th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">05/08/2023</td>
                <td className="py-3 px-4">Dr. Pedro Almeida</td>
                <td className="py-3 px-4">Ortopedia</td>
                <td className="py-3 px-4">Lombalgia</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">20/06/2023</td>
                <td className="py-3 px-4">Dra. Maria Oliveira</td>
                <td className="py-3 px-4">Dermatologia</td>
                <td className="py-3 px-4">Dermatite</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">10/05/2023</td>
                <td className="py-3 px-4">Dr. Carlos Silva</td>
                <td className="py-3 px-4">Cardiologia</td>
                <td className="py-3 px-4">Hipertensão controlada</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Historico