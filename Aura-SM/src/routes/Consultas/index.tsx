import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MedicoType } from "../../types/medico";
import type { ConsultaType } from "../../types/consulta";

const URL_API = "http://localhost:3001";


export default function Consultas() {
    const [consultas, setConsultas] = useState<ConsultaType[]>([]);
    const [medicos, setMedicos] = useState<Record<string, string>>({}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseConsultas = await fetch(`${URL_API}/consultas`);
                if (!responseConsultas.ok) throw new Error("Erro ao carregar consultas.");
                const dataConsultas: ConsultaType[] = await responseConsultas.json();

                const responseMedicos = await fetch(`${URL_API}/medicos`);
                if (!responseMedicos.ok) throw new Error("Erro ao carregar médicos.");
                const dataMedicos: MedicoType[] = await responseMedicos.json(); 

                const medicosMap = dataMedicos.reduce((acc: Record<string, string>, medico: MedicoType) => { 
                    acc[medico.id] = `${medico.nome} - ${medico.especialidade}`;
                    return acc;
                }, {});

                setMedicos(medicosMap);
                setConsultas(dataConsultas);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar os dados. Verifique a API.');
                setLoading(false);
            }
        }

        fetchData();
        document.title = 'Minhas Consultas';
    }, []);

    const handleDelete = async (id: string, pacienteNome: string) => {

        
        console.log(`Tentando cancelar consulta: ${id} do paciente ${pacienteNome}`);
        
        try {
            const response = await fetch(`${URL_API}/consultas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setConsultas(prev => prev.filter(c => c.id !== id));
                console.log(`Consulta ${id} cancelada com sucesso.`);
                // Você pode adicionar um state para mostrar uma mensagem de sucesso aqui (e.g., um toast)
            } else {
                console.error("Erro ao cancelar a consulta:", response.statusText);
                setError(`Falha ao cancelar a consulta ${id}.`);
            }
        } catch (error) {
            console.error("Erro de rede ao cancelar a consulta:", error);
            setError('Erro de rede ao cancelar a consulta. Verifique sua conexão.');
        }
    };

    const getStatus = (data: string, hora: string): string => { 
        const dataConsulta = new Date(`${data}T${hora}`);
        const dataAtual = new Date();
        return dataConsulta > dataAtual ? 'Confirmada' : 'Realizada';
    };

    if (loading) {
        return <p className="text-center py-10 text-gray-600">Carregando consultas...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500 font-bold">{error}</p>;
    }

    return (
        <main>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Minhas Consultas</h1>

                <div className="bg-white rounded-lg shadow-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Consultas</h2>
                    <div className="space-y-4">
                        {consultas.length > 0 ? (
                            consultas.map((consulta) => (
                                <div key={consulta.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg transition duration-200">
                                    <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                                        <div className="mb-2 sm:mb-0">
                                            <h3 className="font-bold text-lg text-blue-600">
                                                Consulta com {medicos[consulta.medicoId] || 'Médico Desconhecido'}
                                            </h3> 
                                            <p className="text-gray-700">Paciente: <span className="font-medium">{consulta.pacienteNome}</span></p>
                                            <p className="text-gray-700 font-mono text-sm">{consulta.data} às {consulta.hora}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatus(consulta.data, consulta.hora) === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                            {getStatus(consulta.data, consulta.hora)}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex space-x-3">
                                        {/* Link de Edição: Encaminha para o componente EditarConsulta */}
                                        <Link 
                                            to={`/editar/consulta/${consulta.id}`} 
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md flex items-center">
                                            Editar
                                        </Link>
                                        {/* Botão de Cancelar: Chama a função handleDelete */}
                                        <button 
                                            onClick={() => handleDelete(consulta.id, consulta.pacienteNome)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-md flex items-center">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-4">Nenhuma consulta agendada.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
