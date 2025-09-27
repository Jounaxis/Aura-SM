export default function Sobre() {
    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">
                    Sobre o Projeto
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Solução Proposta</h2>
                    <p className="text-gray-600 mb-4">
                        A solução que apresentamos é a Aura-SM, um Portal de Auto-Atendimento Médico desenhado para dar ao paciente o controle total e digital sobre sua jornada de saúde. Nosso objetivo primordial é simplificar a gestão de agendamentos, tornando-a rápida, transparente e acessível, eliminando a frustração das longas esperas telefônicas ou da burocracia presencial. O sistema é uma Single Page Application (SPA) construída com tecnologia moderna para garantir uma experiência de uso fluida e confiável.
                    </p>
                    <p className="text-gray-600">
                        No coração da Aura-SM, o paciente encontra um ciclo de serviço completo. A funcionalidade começa com o agendamento, onde o paciente pode facilmente criar novos compromissos, selecionando o médico e a especialidade de sua escolha. Uma vez agendada, a consulta migra para a área de gestão ativa. Aqui, o foco é a flexibilidade: o paciente tem a liberdade de cancelar a consulta caso haja um imprevisto ou editar seus detalhes — seja trocando o médico ou alterando a data e hora do atendimento.
                    </p>
                    <p className="text-gray-600">
                        O sistema se completa com a funcionalidade de histórico, que transforma dados passados em informação útil. O paciente pode acessar todos os seus atendimentos já realizados, visualizar os diagnósticos e, crucialmente, usar filtros por período para encontrar rapidamente qualquer registro específico. Isso garante que o paciente tenha sempre uma visão completa e imediata de sua trajetória de saúde.
                    </p>
                </div>
            </div>
        </main>
    );
}