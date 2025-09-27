import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import type { MedicoType } from "../../types/medico";
import type { ConsultaType } from "../../types/consulta"; 


type NewConsultaForm = Omit<ConsultaType, 'id'>;


const API_URL = "http://localhost:3001";

export default function Agendar() {
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
            const response = await fetch(`${API_URL}/consultas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatusMessage('Consulta agendada com sucesso!');
                reset(); 
                
                setTimeout(() => navigate('/consultas'), 2000); 
            } else {
                setStatusMessage('Erro ao agendar a consulta. Tente novamente.');
                console.error("Erro na API:", await response.json());
            }
        } catch (error) {
            console.error("Erro ao agendar consulta:", error);
            setStatusMessage('Erro de conexão. Verifique o servidor.');
        }
    });

    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Agendar Nova Consulta</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Usar onSubmit do react-hook-form */}
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="idMedico" className="block text-gray-700 font-bold mb-2">Médico:</label>
                            {/* Registrar o campo */}
                            <select
                                id="idMedico"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("medicoId", { required: "Selecione um médico." })}
                            >
                                <option value="">Selecione um médico</option>
                                {medicos.map((medico) => (
                                    <option key={medico.id} value={medico.id}>{medico.nome} - {medico.especialidade}</option>
                                ))}
                            </select>
                            {errors.medicoId && <p className="text-red-500 text-sm mt-1">{errors.medicoId.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="idPaciente" className="block text-gray-700 font-bold mb-2">Nome do Paciente:</label>
                            {/* Registrar o campo */}
                            <input
                                type="text"
                                id="idPaciente"
                                placeholder="Nome Completo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("pacienteNome", { required: "O nome do paciente é obrigatório." })}
                            />
                            {errors.pacienteNome && <p className="text-red-500 text-sm mt-1">{errors.pacienteNome.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="idData" className="block text-gray-700 font-bold mb-2">Data:</label>
                            {/* Registrar o campo */}
                            <input
                                type="date"
                                id="idData"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("data", { required: "A data da consulta é obrigatória." })}
                            />
                            {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="idHora" className="block text-gray-700 font-bold mb-2">Hora:</label>
                            {/* Registrar o campo */}
                            <input
                                type="time"
                                id="idHora"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("hora", { required: "A hora da consulta é obrigatória." })}
                            />
                            {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora.message}</p>}
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
                            >
                                Agendar
                            </button>
                        </div>
                    </form>

                    {/* Feedback de status */}
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
