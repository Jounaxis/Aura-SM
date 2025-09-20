// src/routes/Agendas/Agendas.tsx
import React from 'react'

const Agendas: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
        Agendamento de Consultas
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione uma especialidade</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-blue-50 transition">
            <i className="fas fa-heartbeat text-2xl text-blue-500 mb-2"></i>
            <p>Cardiologia</p>
          </div>
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-blue-50 transition">
            <i className="fas fa-brain text-2xl text-blue-500 mb-2"></i>
            <p>Neurologia</p>
          </div>
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-blue-50 transition">
            <i className="fas fa-baby text-2xl text-blue-500 mb-2"></i>
            <p>Pediatria</p>
          </div>
          <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-blue-50 transition">
            <i className="fas fa-bone text-2xl text-blue-500 mb-2"></i>
            <p>Ortopedia</p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximos horários disponíveis</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Data</th>
                <th className="py-2 px-4 text-left">Horário</th>
                <th className="py-2 px-4 text-left">Médico</th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">15/09/2023</td>
                <td className="py-3 px-4">14:00</td>
                <td className="py-3 px-4">Dr. Carlos Silva - Cardiologia</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Agendar
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">16/09/2023</td>
                <td className="py-3 px-4">10:30</td>
                <td className="py-3 px-4">Dra. Ana Santos - Neurologia</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Agendar
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">17/09/2023</td>
                <td className="py-3 px-4">16:00</td>
                <td className="py-3 px-4">Dr. Pedro Almeida - Ortopedia</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Agendar
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

export default Agendas