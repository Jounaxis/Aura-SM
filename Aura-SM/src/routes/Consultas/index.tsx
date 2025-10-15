import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { MedicoType } from "../../types/medico";
import type { ConsultaType } from "../../types/consulta";

const URL_API = "http://localhost:3001";

const SPECIFIC_DOMAIN = "@auraclinicas.com.br";

const checkCanModify = (): boolean => {

    const currentUserEmail = localStorage.getItem('userToken');

    if (!currentUserEmail) {
        return false;
    }

    return currentUserEmail.endsWith(SPECIFIC_DOMAIN);
}


export default function Consultas() {
    const [consultas, setConsultas] = useState<ConsultaType[]>([]);
    const [medicos, setMedicos] = useState<Record<string, string>>({}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consultationToDelete, setConsultationToDelete] = useState<ConsultaType | null>(null);

    const canModify = checkCanModify();

    const fetchData = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchData();
        document.title = 'Minhas Consultas';
    }, [fetchData]);

    const handleDelete = (consulta: ConsultaType) => {
        if (!canModify) {
            console.warn("Ação de exclusão bloqueada: Usuário não tem permissão de modificação.");
            return;
        }
        setConsultationToDelete(consulta);
        setIsModalOpen(true);
    };

    const confirmDeletion = async () => {
        if (!consultationToDelete) return;

        const { id, pacienteNome } = consultationToDelete;
        setIsModalOpen(false); 
        
        console.log(`Tentando cancelar consulta: ${id} do paciente ${pacienteNome}`);
        
        try {
            const response = await fetch(`${URL_API}/consultas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {

                setConsultas(prev => prev.filter(c => c.id !== id));
                console.log(`Consulta ${id} cancelada com sucesso.`);
            } else {
                console.error("Erro ao cancelar a consulta:", response.statusText);
                setError(`Falha ao cancelar a consulta ${id}.`);
            }
        } catch (error) {
            console.error("Erro de rede ao cancelar a consulta:", error);
            setError('Erro de rede ao cancelar a consulta. Verifique sua conexão.');
        } finally {

            setConsultationToDelete(null);
        }
    };

    const cancelDeletion = () => {
        setIsModalOpen(false);
        setConsultationToDelete(null);
        console.log("Cancelamento da consulta abortado pelo usuário (via modal).");
    }

    const getStatus = (data: string, hora: string): string => { 
        const dataConsulta = new Date(`${data}T${hora}`);
        const dataAtual = new Date();
        return dataConsulta > dataAtual ? 'Confirmada' : 'Realizada';
    };

    const ConfirmationModal = () => {
        if (!isModalOpen || !consultationToDelete) return null;

        const { pacienteNome, data, hora, medicoId } = consultationToDelete;
        const medicoInfo = medicos[medicoId] || 'Médico Desconhecido';

        return (

            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">

                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 transform transition-all duration-300 scale-100">
                    <h3 className="text-2xl font-bold text-red-600 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Confirmar Cancelamento
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Você está prestes a **cancelar permanentemente** a seguinte consulta:
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                        <p className="font-semibold text-gray-800">Paciente: <span className="text-red-700">{pacienteNome}</span></p>
                        <p className="text-sm text-gray-600">Com: {medicoInfo}</p>
                        <p className="text-sm text-gray-600">Data e Hora: {data} às {hora}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Esta ação não pode ser desfeita. Tem certeza de que deseja prosseguir?
                    </p>
                    

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={cancelDeletion}
                            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 font-medium"
                        >
                            Manter Consulta
                        </button>
                        <button
                            onClick={confirmDeletion}
                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 font-medium shadow-md"
                        >
                            Sim, Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }


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

                                        {canModify && (
                                            <Link 
                                                to={`/editar/consulta/${consulta.id}`} 
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md flex items-center">
                                                Editar
                                            </Link>
                                        )}

                                        {canModify && (

                                            <button 
                                                onClick={() => handleDelete(consulta)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-md flex items-center">
                                                Cancelar
                                            </button>
                                        )}
                                        
                                        {!canModify && (
                                            <span className="text-sm text-gray-500 italic">Ações de edição reservadas.</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-4">Nenhuma consulta agendada.</p>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal />
        </main>
    );
}
