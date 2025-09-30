// Home.tsx

import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { CiCalendar, CiMedicalCross, CiRead, CiUser } from 'react-icons/ci';
import type { IconeNome, RotasType } from '../../types/rotas';
import { rotasData } from '../../types/rotas'; 


export default function Home() {

    const [funcionalidades, setFuncionalidades] = useState<RotasType[]>(rotasData); 

    const getIcon = (iconName: IconeNome): React.ReactElement | null => {
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
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Portal de Auto-Atendimento</h1>

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