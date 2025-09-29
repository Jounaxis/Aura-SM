export type ConsultaStatus = 'agendada' | 'confirmada' | 'cancelada' | 'realizada';

export type ConsultaType = {
    id: string;
    medicoId: number | string; 
    pacienteNome: string;
    data: string;
    hora: string;
    status?: ConsultaStatus; 
};