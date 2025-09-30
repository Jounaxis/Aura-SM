
export type IconeNome = 'cross' | 'calendar' | 'read' | 'user';

export interface RotasType {
    id: number;
    titulo: string;
    icone: IconeNome; 
    descricao: string;
    link: string;
}

export const rotasData: RotasType[] = [
    {
        id: 1,
        titulo: 'Agendar Consulta',
        icone: 'cross',
        descricao: 'Encontre e agende uma consulta com um de nossos especialistas.',
        link: '/agendar',
    },
    {
        id: 2,
        titulo: 'Minhas Consultas',
        icone: 'calendar',
        descricao: 'Visualize e gerencie suas consultas agendadas. Confirmações e cancelamentos podem ser feitos aqui.',
        link: '/consultas',
    },
    {
        id: 3,
        titulo: 'Histórico Médico',
        icone: 'read',
        descricao: 'Acesse seu histórico de consultas, diagnósticos e exames realizados.',
        link: '/historico',
    },
    {
        id: 4,
        titulo: 'Dados Pessoais',
        icone: 'user',
        descricao: 'Atualize suas informações pessoais e de contato de forma segura.',
        link: '/perfil',
    }
];
