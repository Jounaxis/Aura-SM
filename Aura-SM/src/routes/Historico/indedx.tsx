import { useEffect, useState } from 'react';
import type { HistoricoType,} from '../../types/consulta'; 
import type { MedicoType } from '../../types/medico';

const URL_API = "http://localhost:3001";

export default function Historico() {
    const [historico, setHistorico] = useState<HistoricoType[]>([]);
    const [medicos, setMedicos] = useState<Record<string, MedicoType>>({});
    const [dataInicial, setDataInicial] = useState<string>('');
    const [dataFinal, setDataFinal] = useState<string>('');
    const [historicoFiltrado, setHistoricoFiltrado] = useState<HistoricoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (e) {
            console.error("Erro ao formatar data:", e);
            return dateString; 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const responseHistorico = await fetch(`${URL_API}/historico`);
                const dataHistorico: HistoricoType[] = await responseHistorico.json();
                setHistorico(dataHistorico);

                const responseMedicos = await fetch(`${URL_API}/medicos`);
                const dataMedicos: MedicoType[] = await responseMedicos.json();

                const medicosMap = dataMedicos.reduce((acc, medico) => {
                    acc[medico.id] = medico;
                    return acc;
                }, {} as Record<string, MedicoType>);

                setMedicos(medicosMap);

            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError("Ocorreu um erro ao carregar o histórico ou os dados dos médicos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        document.title = 'Histórico Médico';
    }, []);

    useEffect(() => {
        let filteredData = historico.filter(consulta => consulta.status === 'realizada');

        if (dataInicial && dataFinal) {
            const inicio = new Date(dataInicial + 'T00:00:00');
            const fim = new Date(dataFinal + 'T23:59:59');

            filteredData = filteredData.filter(consulta => {
                const dataConsulta = new Date(consulta.data + 'T00:00:00');
                return dataConsulta >= inicio && dataConsulta <= fim;
            });
        }
        
        setHistoricoFiltrado(filteredData);
    }, [historico, dataInicial, dataFinal]);

    const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
    };

    if (isLoading) {
        return (
            <main>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl font-medium text-blue-600">Carregando histórico...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="container mx-auto px-4 py-8">
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-400">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-600">Histórico de Consultas Realizadas</h1>

                <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Filtrar por Período</h2>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Data Inicial</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    value={dataInicial}
                                    onChange={(e) => setDataInicial(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Data Final</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    value={dataFinal}
                                    onChange={(e) => setDataFinal(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleFilterClick}
                                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-md transform hover:scale-[1.02]"
                            >
                                Aplicar Filtro
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-3 px-4 text-left rounded-tl-lg">Data</th>
                                    <th className="py-3 px-4 text-left">Médico</th>
                                    <th className="py-3 px-4 text-left">Especialidade</th>
                                    <th className="py-3 px-4 text-left">Diagnóstico</th>
                                    <th className="py-3 px-4 text-left rounded-tr-lg">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicoFiltrado.length > 0 ? (
                                    historicoFiltrado.map((consulta) => (
                                        <tr key={consulta.id} className="border-b transition duration-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium text-gray-700">
                                                {formatDate(consulta.data)} às {consulta.horario}
                                            </td>
                                            <td className="py-3 px-4">{medicos[consulta.medicoId]?.nome || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{medicos[consulta.medicoId]?.especialidade || 'N/A'}</td>
                                            <td className="py-3 px-4 max-w-xs truncate">{consulta.diagnostico || 'Sem diagnóstico registrado'}</td>
                                            <td className="py-3 px-4">
                                                <button className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-teal-600 transition shadow-sm">
                                                    Ver Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 px-4 text-center text-gray-500 bg-gray-50 rounded-b-lg">
                                            Nenhum histórico de consulta **realizada** encontrado {dataInicial && dataFinal ? `entre ${formatDate(dataInicial)} e ${formatDate(dataFinal)}.` : '.'}
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