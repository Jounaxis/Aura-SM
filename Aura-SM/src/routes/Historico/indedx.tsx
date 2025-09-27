import { useEffect, useState } from 'react';

type HistoricoType = {
    id: number;
    pacienteId: string;
    medicoId: string;
    data: string;
    horario: string;
    status: string;
    diagnostico: string;
};

type MedicoType = {
    id: string;
    nome: string;
    especialidade: string;
};

export default function Historico() {
    const [historico, setHistorico] = useState<HistoricoType[]>([]);
    const [medicos, setMedicos] = useState<Record<string, MedicoType>>({});
    const [dataInicial, setDataInicial] = useState<string>('');
    const [dataFinal, setDataFinal] = useState<string>('');
    const [historicoFiltrado, setHistoricoFiltrado] = useState<HistoricoType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseHistorico = await fetch("http://localhost:3001/historico");
                const dataHistorico: HistoricoType[] = await responseHistorico.json();
                setHistorico(dataHistorico);

                const responseMedicos = await fetch("http://localhost:3001/medicos");
                const dataMedicos: MedicoType[] = await responseMedicos.json();

                const medicosMap = dataMedicos.reduce((acc, medico) => {
                    acc[medico.id] = medico;
                    return acc;
                }, {} as Record<string, MedicoType>);

                setMedicos(medicosMap);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filteredData = historico;

        if (dataInicial && dataFinal) {
            const inicio = new Date(dataInicial + 'T00:00:00');
            const fim = new Date(dataFinal + 'T23:59:59');

            filteredData = historico.filter(consulta => {
                const dataConsulta = new Date(consulta.data + 'T00:00:00');
                return dataConsulta >= inicio && dataConsulta <= fim;
            });
        }
        setHistoricoFiltrado(filteredData);
    }, [historico, dataInicial, dataFinal]);

    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Histórico Médico</h1>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrar por período</h2>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            <input
                                type="date"
                                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dataInicial}
                                onChange={(e) => setDataInicial(e.target.value)}
                            />
                            <input
                                type="date"
                                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dataFinal}
                                onChange={(e) => setDataFinal(e.target.value)}
                            />
                            {/* O botão 'Filtrar' é decorativo, pois o filtro é automático com o useEffect */}
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Filtrar
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left">Data</th>
                                    <th className="py-2 px-4 text-left">Médico</th>
                                    <th className="py-2 px-4 text-left">Especialidade</th>
                                    <th className="py-2 px-4 text-left">Diagnóstico</th>
                                    <th className="py-2 px-4 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicoFiltrado.length > 0 ? (
                                    historicoFiltrado.map((consulta) => (
                                        <tr key={consulta.id} className="border-b">
                                            <td className="py-3 px-4">{consulta.data}</td>
                                            <td className="py-3 px-4">{medicos[consulta.medicoId]?.nome || 'N/A'}</td>
                                            <td className="py-3 px-4">{medicos[consulta.medicoId]?.especialidade || 'N/A'}</td>
                                            <td className="py-3 px-4">{consulta.diagnostico}</td>
                                            <td className="py-3 px-4">
                                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                                    Ver Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-3 px-4 text-center text-gray-500">
                                            Nenhum registro encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}