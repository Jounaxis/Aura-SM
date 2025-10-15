import { useRouteError, Link } from 'react-router-dom';

export default function Error() {
    const error = useRouteError() as { statusText?: string; message?: string };

    return (
        <main>
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex items-center justify-center">
                <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl">
                    <h1 className="text-7xl md:text-9xl font-extrabold text-blue-600 mb-4 animate-pulse">404</h1>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">Erro 404 - Página não encontrada</h2>
                    
                    {error && (error.statusText || error.message) && (
                        <p className="text-sm text-red-500 mb-4 italic">
                            Detalhes: {error.statusText || error.message}
                        </p>
                    )}

                    <p className="text-gray-600 mb-8">
                        Desculpe, a URL que você tentou acessar não foi encontrada em nossa plataforma.
                    </p>
                    
                    <Link 
                        to="/home" 
                        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
                    >
                        Voltar para o Início
                    </Link>
                </div>
            </div>
        </main>
    );
}