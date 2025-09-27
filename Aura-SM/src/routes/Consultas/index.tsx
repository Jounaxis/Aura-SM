import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ConsultaType } from "../../types/consulta";
import type { MedicoType } from "../../types/medico"; 

export default function Consultas() {
    const [consultas, setConsultas] = useState<ConsultaType[]>([]);
    const [medicos, setMedicos] = useState<Record<string, string>>({}); 

    useEffect(() => {
        try {
            const fetchData = async () => {
                const responseConsultas = await fetch("http://localhost:3001/consultas");
                const dataConsultas: ConsultaType[] = await responseConsultas.json();

                const responseMedicos = await fetch("http://localhost:3001/medicos");
                const dataMedicos: MedicoType[] = await responseMedicos.json(); 

                const medicosMap = dataMedicos.reduce((acc: Record<string, string>, medico: MedicoType) => { 
                    acc[medico.id] = `${medico.nome} - ${medico.especialidade}`;
                    return acc;
                }, {});

                setMedicos(medicosMap);
                setConsultas(dataConsultas);
            }

            fetchData();

        } catch (error) {
            console.error(error);
        }
    }, []);

    const getStatus = (data: string, hora: string): string => { 
        const dataConsulta = new Date(`${data}T${hora}`);
        const dataAtual = new Date();
        return dataConsulta > dataAtual ? 'Confirmada' : 'Realizada';
    };

    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Minhas Consultas</h1>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Consultas</h2>
                    <div className="space-y-4">
                        {consultas.length > 0 ? (
                            consultas.map((consulta) => (
                                <div key={consulta.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">Consulta com {medicos[consulta.medicoId]}</h3> {/* Usar o map para obter o nome do médico */}
                                            <p className="text-gray-600">Paciente: {consulta.pacienteNome}</p>
                                            <p className="text-gray-600">{consulta.data} às {consulta.hora}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-sm ${getStatus(consulta.data, consulta.hora) === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {getStatus(consulta.data, consulta.hora)}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex space-x-2">
                                        <Link to={`/editar/consulta/${consulta.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition flex items-center">
                                            Editar
                                        </Link>
                                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Nenhuma consulta agendada.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
