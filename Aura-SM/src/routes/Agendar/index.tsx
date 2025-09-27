import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import type { MedicoType } from "../../types/medico"; // Import de tipo restaurado
import type { ConsultaType } from "../../types/consulta"; // Import de tipo restaurado 


type NewConsultaForm = Omit<ConsultaType, 'id'>;


// CORREÇÃO: A API base é definida localmente como http://localhost:3001 para evitar
// o erro de compilação com 'import.meta.env' no ambiente de destino.
const API_URL = "http://localhost:3001";

export default function Agendar() {
    // useNavigate restaurado para uso real com react-router-dom
    const navigate = useNavigate(); 

    
    const [medicos, setMedicos] = useState<MedicoType[]>([]);
    
    const [statusMessage, setStatusMessage] = useState('');

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<NewConsultaForm>({
        defaultValues: {
            medicoId: '',
            pacienteNome: '',
            data: '',
            hora: ''
        }
    });

    useEffect(() => {
        document.title = 'Agendar Consulta';

        const fetchMedicos = async () => {
            try {
                // Chamada de API para listar médicos
                const response = await fetch(`${API_URL}/medicos`);
                const data: MedicoType[] = await response.json();
                setMedicos(data);
            } catch (error) {
                console.error("Erro ao buscar médicos:", error);
                setStatusMessage('Não foi possível carregar a lista de médicos.');
            }
        };

        fetchMedicos();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        setStatusMessage('');

        try {
            // Chamada de API para AGENDAR a consulta (POST para /consultas)
            const response = await fetch(`${API_URL}/consultas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatusMessage('Consulta agendada com sucesso! Redirecionando...');
                reset(); 
                
                // Redireciona para /consultas após 2 segundos
                setTimeout(() => navigate('/consultas'), 2000); 
            } else {
                // Tenta ler o erro da API, se disponível
                const errorData = await response.json();
                setStatusMessage(`Erro ao agendar a consulta: ${errorData.message || response.statusText}.`);
                console.error("Erro na API:", errorData);
            }
        } catch (error) {
            console.error("Erro ao agendar consulta:", error);
            setStatusMessage('Erro de conexão. Verifique o servidor e a URL da API.');
        }
    });

    return (
        <main>
            <div className="container mx-auto px-4 py-8 max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Agendar Nova Consulta</h1>
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    {/* Usar onSubmit do react-hook-form */}
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="idMedico" className="block text-gray-700 font-bold mb-2">Médico:</label>
                            {/* Registrar o campo */}
                            <select
                                id="idMedico"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                {...register("medicoId", { required: "Selecione um médico." })}
                            >
                                <option value="">Selecione um médico</option>
                                {medicos.map((medico) => (
                                    <option key={medico.id} value={medico.id}>{medico.nome} - {medico.especialidade}</option>
                                ))}
                            </select>
                            {errors.medicoId && <p className="text-red-500 text-sm mt-1 font-medium">{errors.medicoId.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="idPaciente" className="block text-gray-700 font-bold mb-2">Nome do Paciente:</label>
                            {/* Registrar o campo */}
                            <input
                                type="text"
                                id="idPaciente"
                                placeholder="Nome Completo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                {...register("pacienteNome", { required: "O nome do paciente é obrigatório." })}
                            />
                            {errors.pacienteNome && <p className="text-red-500 text-sm mt-1 font-medium">{errors.pacienteNome.message}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <label htmlFor="idData" className="block text-gray-700 font-bold mb-2">Data:</label>
                                {/* Registrar o campo */}
                                <input
                                    type="date"
                                    id="idData"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                    {...register("data", { required: "A data da consulta é obrigatória." })}
                                />
                                {errors.data && <p className="text-red-500 text-sm mt-1 font-medium">{errors.data.message}</p>}
                            </div>

                            <div className="flex-1">
                                <label htmlFor="idHora" className="block text-gray-700 font-bold mb-2">Hora:</label>
                                {/* Registrar o campo */}
                            <input
                                    type="time"
                                    id="idHora"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                    {...register("hora", { required: "A hora da consulta é obrigatória." })}
                                />
                                {errors.hora && <p className="text-red-500 text-sm mt-1 font-medium">{errors.hora.message}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150 shadow-md hover:shadow-lg"
                            >
                                Agendar
                            </button>
                        </div>
                    </form>

                    {/* Feedback de status */}
                    {statusMessage && (
                        <div className={`mt-6 p-4 text-center rounded-lg font-semibold ${
                            statusMessage.includes('sucesso') ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
