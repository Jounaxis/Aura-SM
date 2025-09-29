import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import type { MedicoType } from "../../types/medico"; 
import type { ConsultaType } from "../../types/consulta"; 


type NewConsultaForm = Omit<ConsultaType, 'id'>;

const API_URL = "http://localhost:3001";

const getTodayDateString = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function Agendar() {
    const navigate = useNavigate(); 
    
    const [medicos, setMedicos] = useState<MedicoType[]>([]);
    
    const [statusMessage, setStatusMessage] = useState('');

    const minDate = getTodayDateString();

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
                setStatusMessage('Consulta agendada com sucesso! Redirecionando...');
                reset(); 
                
                setTimeout(() => navigate('/consultas'), 2000); 
            } else {
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
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="idMedico" className="block text-gray-700 font-bold mb-2">Médico:</label>
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
                                <input
                                    type="date"
                                    id="idData"
                                    min={minDate} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                    {...register("data", { 
                                        required: "A data da consulta é obrigatória.",
                                        validate: (value) => {
                                            const selectedDate = new Date(value + 'T00:00:00');
                                            const today = new Date(minDate + 'T00:00:00');
                                            return selectedDate >= today || "A data não pode ser anterior à data de hoje.";
                                        }
                                    })}
                                />
                                {errors.data && <p className="text-red-500 text-sm mt-1 font-medium">{errors.data.message}</p>}
                            </div>

                            <div className="flex-1">
                                <label htmlFor="idHora" className="block text-gray-700 font-bold mb-2">Hora:</label>
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