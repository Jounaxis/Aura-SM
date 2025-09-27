import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ConsultaType } from "../../types/consulta";
import type { MedicoType } from "../../types/medico";
import { useForm } from "react-hook-form";

const URL_API = "http://localhost:3001"; 

interface StatusMessageProps {
    type: 'success' | 'error';
    message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
    const baseClasses = "p-4 mb-4 rounded-lg font-medium shadow-md transition-opacity duration-300";
    const successClasses = "bg-green-100 text-green-700 border border-green-400";
    const errorClasses = "bg-red-100 text-red-700 border border-red-400";
    
    if (!message) return null;

    return (
        <div className={`${baseClasses} ${type === 'success' ? successClasses : errorClasses}`}>
            {message}
        </div>
    );
}

export default function EditarConsulta() {
    
    const { id } = useParams<string>();
    const navigate = useNavigate();
    
    const [medicos, setMedicos] = useState<MedicoType[]>([]); 
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm<ConsultaType>({
        mode: "onChange"
    });

    useEffect(() => {
        const fetchConsultaAndMedicos = async () => {
            try {
                const responseMedicos = await fetch(`${URL_API}/medicos`);
                const dataMedicos: MedicoType[] = await responseMedicos.json(); 
                setMedicos(dataMedicos);

                const responseConsulta = await fetch(`${URL_API}/consultas/${id}`);
                const dataConsulta: ConsultaType = await responseConsulta.json();
                
                reset(dataConsulta);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setStatusMessage({ type: 'error', message: 'Erro ao carregar os dados da consulta ou dos médicos.' });
            }
        };

        fetchConsultaAndMedicos();
        
        document.title = 'Editar Consulta';
    }, [id, reset]);


    const onSubmit = async (data: ConsultaType) => {
        setStatusMessage(null);
        
        try {
            const response = await fetch(`${URL_API}/consultas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.statusText}`);
            }

            setStatusMessage({ type: 'success', message: '✅ Consulta atualizada com sucesso!' });
            
            setTimeout(() => {
                 navigate('/consultas');
            }, 1500);

        } catch (error) {
            console.error("Erro ao atualizar a consulta:", error);
            setStatusMessage({ type: 'error', message: '❌ Erro ao atualizar a consulta. Tente novamente.' });
        }
    }


    return (
        <main>
            <div className="container mx-auto px-4 py-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Editar Consulta</h1>
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto">
                    
                    {statusMessage && <StatusMessage type={statusMessage.type} message={statusMessage.message} />}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="idMedico" className="block text-gray-700 font-bold mb-2">Médico:</label>
                            <select
                                id="idMedico"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.medicoId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                {...register("medicoId", { required: "O médico é obrigatório." })}
                                >
                                <option value="">Selecione um médico</option>
                                {medicos.map((medico) => (
                                    <option key={medico.id} value={medico.id}>
                                        {medico.nome} - {medico.especialidade}
                                    </option>
                                ))}
                            </select>
                            {errors.medicoId && <p className="text-red-500 text-xs italic mt-1">{errors.medicoId.message}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="idPaciente" className="block text-gray-700 font-bold mb-2">Nome do Paciente:</label>
                            <input
                                type="text"
                                id="idPaciente"
                                placeholder="Nome completo do paciente"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.pacienteNome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                {...register("pacienteNome", { 
                                    required: "O nome do paciente é obrigatório.", 
                                    minLength: {
                                        value: 3,
                                        message: "O nome deve ter pelo menos 3 caracteres."
                                    }
                                })}
                                />
                            {errors.pacienteNome && <p className="text-red-500 text-xs italic mt-1">{errors.pacienteNome.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="idData" className="block text-gray-700 font-bold mb-2">Data:</label>
                            <input
                                type="date"
                                id="idData"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.data ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                {...register("data", { required: "A data é obrigatória." })}
                                />
                            {errors.data && <p className="text-red-500 text-xs italic mt-1">{errors.data.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="idHora" className="block text-gray-700 font-bold mb-2">Hora:</label>
                            <input
                                type="time"
                                id="idHora"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.hora ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                {...register("hora", { required: "A hora é obrigatória." })}
                                />
                            {errors.hora && <p className="text-red-500 text-xs italic mt-1">{errors.hora.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
