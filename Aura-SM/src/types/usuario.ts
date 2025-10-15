export type UsuarioType = {
    id?: string; 
    email: string; 
    senha: string;
    tipo?: "normal" | "especial" | string; 
};
