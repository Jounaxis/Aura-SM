import React from 'react';

// Componente Rodape estilizado com Tailwind CSS para seguir a estética do site.
export default function Rodape(){

    return(
        // Footer com fundo claro, borda superior sutil e margem no topo para separação
        <footer className="bg-gray-50 border-t border-blue-500/20">
            <div className=" px-4 py-6 text-center">
                
                {/* Texto de direitos autorais e RMs */}
                <p className="text-xs text-white leading-relaxed max-w-5xl mx-auto">
                    &copy; Todos os direitos reservados - 2025. Aura-SM | 
                    {/* Destacando os nomes para melhor legibilidade */}
                    <span className="font-medium text-white"> Pedro Peres Benitez - RM: 561792 </span> | 
                    <span className="font-medium text-white"> Lucca Ramos Mussumecci - RM: 562027 </span> | 
                    <span className="font-medium text-white"> João Victor Gomes de Souza - RM: 560907</span>
                </p>
                
                <p className="text-xs text-blue-400 mt-3 font-light">
                    Aura-SM: Agendamentos inteligentes e práticos.
                </p>
            </div>
        </footer>
    );
}
