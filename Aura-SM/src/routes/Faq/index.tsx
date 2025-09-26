export default function Faq() {
    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
                    Perguntas Frequentes
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">1.</span> Como faço para agendar uma consulta?
                        </p>
                        <p className="text-gray-600">
                            R: Acesse o menu 'Agendar' na aba home e escolha seu profissional.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">2.</span> Como funciona o armazenamento de dados?
                        </p>
                        <p className="text-gray-600">
                            R: Usamos criptografia e armazenamento seguro conforme a LGPD.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">3.</span> A plataforma é gratuita?
                        </p>
                        <p className="text-gray-600">
                            R: O cadastro é gratuito, porém as consultas podem ter custos conforme o profissional.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">4.</span> Onde posso alterar meus dados?
                        </p>
                        <p className="text-gray-600">
                            R: No seu perfil, após login, você pode atualizar seus dados pessoais.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}