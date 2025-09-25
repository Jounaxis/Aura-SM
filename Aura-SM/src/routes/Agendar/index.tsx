import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MedicoType } from "../../types/medico";

export default function Agendar() {

    const navigate = useNavigate();

    const [consulta, setConsulta] = useState({
        id: 0,
        medicoId: '',
        pacienteNome: '',
        data: '',
        hora: ''
    });

    const [medicos, setMedicos] = useState<MedicoType[]>([]);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        // Simula a busca por médicos disponíveis
        const fetchMedicos = async () => {
            const response = await fetch("http://localhost:3001/medicos");
            const data:MedicoType[] = await response.json();
            setMedicos(data);
        };

        fetchMedicos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(''); // Limpa a mensagem anterior

        try {
            // Lógica para enviar os dados da nova consulta para o servidor
            const response = await fetch(`http://localhost:3001/consultas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consulta)
            });

            if (response.ok) {
                setStatusMessage('Consulta agendada com sucesso!');
                // Redireciona para a página de listagem de consultas após o agendamento
                setTimeout(() => navigate('/consultas'), 2000); // Redireciona após 2 segundos para o usuário ver a mensagem
            } else {
                setStatusMessage('Erro ao agendar a consulta. Tente novamente.');
            }
        } catch (error) {
            console.error("Erro ao agendar consulta:", error);
            setStatusMessage('Erro de conexão. Verifique o servidor.');
        }
    }

   return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
                    Agendar Nova Consulta
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="idMedico" className="block text-gray-700 font-bold mb-2">Médico:</label>
                            <select
                                name="medicoId"
                                id="idMedico"
                                value={consulta.medicoId}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setConsulta({ ...consulta, medicoId: e.target.value })}
                            >
                                <option value="">Selecione um médico</option>
                                {medicos.map((medico) => (
                                    <option key={medico.id} value={medico.id}>{medico.nome} - {medico.especialidade}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idPaciente" className="block text-gray-700 font-bold mb-2">Nome do Paciente:</label>
                            <input
                                type="text"
                                name="pacienteNome"
                                id="idPaciente"
                                value={consulta.pacienteNome}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setConsulta({ ...consulta, pacienteNome: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idData" className="block text-gray-700 font-bold mb-2">Data:</label>
                            <input
                                type="date"
                                name="data"
                                id="idData"
                                value={consulta.data}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setConsulta({ ...consulta, data: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="idHora" className="block text-gray-700 font-bold mb-2">Hora:</label>
                            <input
                                type="time"
                                name="hora"
                                id="idHora"
                                value={consulta.hora}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setConsulta({ ...consulta, hora: e.target.value })}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            >
                                Agendar
                            </button>
                        </div>
                    </form>
                    {statusMessage && (
                        <div className={`mt-4 p-4 text-center rounded-md ${
                            statusMessage.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
 }
