import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ConsultaType } from "../../types/consulta";
import type { MedicoType } from "../../types/medico"; // Importar a tipagem correta para médicos

export default function EditarConsulta() {

    const { id } = useParams<string>();

    const navigate = useNavigate();

    const [consulta, setConsulta] = useState<ConsultaType>({
        id: 0,
        medicoId: '',
        pacienteNome: '',
        data: '',
        hora: ''
    });

    const [medicos, setMedicos] = useState<MedicoType[]>([]); 

    useEffect(() => {
        const fetchConsultaAndMedicos = async () => {
            const responseConsulta = await fetch(`http://localhost:3001/consultas/${id}`);
            const dataConsulta: ConsultaType = await responseConsulta.json();
            setConsulta(dataConsulta);

            const responseMedicos = await fetch("http://localhost:3001/medicos");
            const dataMedicos: MedicoType[] = await responseMedicos.json(); 
            setMedicos(dataMedicos);
        };

        fetchConsultaAndMedicos();
    }, [id]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:3001/consultas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consulta)
            });
            alert('Consulta atualizada com sucesso!');

            navigate('/consultas');

        } catch (error) {
            console.error("Erro ao atualizar a consulta:", error);
            alert("Erro ao atualizar a consulta.");
        }
    }


    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Editar Consulta</h1>
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
                            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}