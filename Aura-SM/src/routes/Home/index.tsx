import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CiCalendar, CiMedicalCross, CiRead, CiUser } from 'react-icons/ci';

// Definição da tipagem para os cards de funcionalidade
interface FuncionalidadeType {
    id: number;
    titulo: string;
    icone: string;
    descricao: string;
    link: string;
}

export default function Home() {
    const [funcionalidades, setFuncionalidades] = useState<FuncionalidadeType[]>([]);

    useEffect(() => {
        // Dados estáticos simulando uma API para as funcionalidades da home
        const dadosFuncionalidades: FuncionalidadeType[] = [
            {
                id: 1,
                titulo: 'Minhas Consultas',
                icone: 'calendar',
                descricao: 'Visualize e gerencie suas consultas agendadas. Confirmações e cancelamentos podem ser feitos aqui.',
                link: '/consultas',
            },
            {
                id: 2,
                titulo: 'Histórico Médico',
                icone: 'read',
                descricao: 'Acesse seu histórico de consultas, diagnósticos e exames realizados.',
                link: '/historico',
            },
            {
                id: 3,
                titulo: 'Agendar Consulta',
                icone: 'cross',
                descricao: 'Encontre e agende uma consulta com um de nossos especialistas.',
                link: '/agendar',
            },
            {
                id: 4,
                titulo: 'Dados Pessoais',
                icone: 'user',
                descricao: 'Atualize suas informações pessoais e de contato de forma segura.',
                link: '/perfil',
            }
        ];
        setFuncionalidades(dadosFuncionalidades);
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'calendar':
                return <CiCalendar className="text-xl" />;
            case 'read':
                return <CiRead className="text-xl" />;
            case 'cross':
                return <CiMedicalCross className="text-xl" />;
            case 'user':
                return <CiUser className="text-xl" />;
            default:
                return null;
        }
    };

    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
                    Portal de Auto-Atendimento
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {funcionalidades.map((funcionalidade) => (
                        <Link key={funcionalidade.id} to={funcionalidade.link}>
                            <div className="bg-white rounded-lg shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                                        {getIcon(funcionalidade.icone)}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">{funcionalidade.titulo}</h2>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {funcionalidade.descricao}
                                </p>
                                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition">
                                    Acessar
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}