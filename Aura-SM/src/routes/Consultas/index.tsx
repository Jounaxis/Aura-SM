// src/routes/Consultas/Consultas.tsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ConsultaType } from '../../types/consulta';

export default function Consultas(){
  const [consultas,setConsultas] = useState<ConsultaType[]>([]);
  useEffect(()=>{
    try {
      const fetchData = async ()=>{
        const response = await fetch("http://localhost:3001/consultas");
        const data = await response.json();
        console.log(data);
        setConsultas(data);
      }

    } catch (error) {
      console.error(error);
    }
  },[]);
    
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Minhas Consultas</h1>
      <table>

      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Consultas</h2>
        
        <div className="space-y-4">

        </div>
      </div>
      </table>
      
    </main>
  )

}