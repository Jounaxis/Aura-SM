export default function Faq() {
    return (
        <main>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Perguntas Frequentes (FAQ)</h1>
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    
                    <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b">Sobre o Agendamento e a Plataforma</h2>
                    
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">1.</span> Como faço para agendar uma consulta?
                        </p>
                        <p className="text-gray-600">
                            Acesse o menu 'Agendar' e preencha o formulário com o Médico, seu Nome Completo, a Data e a Hora desejadas. O sistema enviará os dados para confirmação do agendamento.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">2.</span> Quais dados são obrigatórios no momento do agendamento?
                        </p>
                        <p className="text-gray-600">
                            Você deve, obrigatoriamente, selecionar um médico, informar o nome do paciente, e escolher a data e hora da consulta. Caso falte alguma informação, o sistema avisará.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">3.</span> O que acontece depois que eu clico em 'Agendar'?
                        </p>
                        <p className="text-gray-600">
                            Se o agendamento for bem-sucedido, você receberá uma mensagem de confirmação. Em seguida, o formulário será limpo e você será redirecionado automaticamente para a página de visualização das suas consultas.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">4.</span> Como vejo minhas consultas agendadas?
                        </p>
                        <p className="text-gray-600">
                            Todas as suas consultas agendadas, tanto as futuras (status Confirmada) quanto as que já passaram (status Realizada), podem ser visualizadas na página 'Minhas Consultas'.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">5.</span> Como faço para editar uma consulta?
                        </p>
                        <p className="text-gray-600">
                            Na página 'Minhas Consultas', clique no botão 'Editar' ao lado da consulta que deseja alterar. Você será levado a um formulário pré-preenchido onde poderá mudar o médico, o paciente, a data ou a hora. Salve as alterações para confirmá-las.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">6.</span> Como faço para cancelar uma consulta?
                        </p>
                        <p className="text-gray-600">
                            Na página 'Minhas Consultas', localize a consulta e clique no botão **'Cancelar'**. Uma vez confirmada, a consulta será removida permanentemente da sua lista.
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">7.</span> Tive um erro ao agendar. O que devo fazer?
                        </p>
                        <p className="text-gray-600">
                            Se aparecer uma mensagem de erro após a submissão, verifique se todos os campos estão preenchidos corretamente. Se o erro persistir, pode haver um problema de comunicação com o servidor. Tente novamente mais tarde.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">8.</span> Como a lista de médicos para seleção é carregada?
                        </p>
                        <p className="text-gray-600">
                            A lista de médicos disponíveis é carregada automaticamente assim que a página de agendamento é aberta. Você só precisa escolher o profissional desejado no campo de seleção.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-blue-600 mb-4 pb-2 border-b mt-8">Outras Dúvidas</h2>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">9.</span> Como funciona o armazenamento dos meus dados pessoais?
                        </p>
                        <p className="text-gray-600">
                            Usamos criptografia e armazenamento seguro, seguindo todas as normas de privacidade para proteger suas informações.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">10.</span> A plataforma cobra alguma taxa de uso?
                        </p>
                        <p className="text-gray-600">
                            O cadastro e o uso da plataforma são gratuitos. No entanto, as consultas agendadas podem ter custos que variam conforme o profissional e o tipo de serviço.
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 mb-2">
                            <span className="font-bold">11.</span> Onde posso alterar meus dados de cadastro?
                        </p>
                        <p className="text-gray-600">
                            No seu perfil, após realizar o login, você encontrará a opção para atualizar seus dados pessoais, como telefone e endereço.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}