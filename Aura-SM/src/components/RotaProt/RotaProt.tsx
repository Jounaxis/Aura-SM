import { Navigate, Outlet } from 'react-router-dom';

/**
 * Verifica se o usuário possui um token de autenticação no localStorage.
 * @returns {boolean} True se o token existir, False caso contrário.
 */
const isAuthenticated = (): boolean => {
    // O token foi salvo no localStorage após o login bem-sucedido.
    const token = localStorage.getItem('userToken');
    return !!token; 
};

/**
 * Componente que protege as rotas filhas.
 * Redireciona para a rota raiz (Login) se o usuário não estiver autenticado.
 */
export default function RotaProt () {
    const isAuth = isAuthenticated();
        
    // Lógica CORRIGIDA: Se NÃO estiver autenticado, redireciona para a rota raiz (Login)
    if (!isAuth) {
        // Usa "/" que, no seu roteamento, é mapeado para o <Login/>
        return <Navigate to="/" replace />; 
    }
        
    // Se estiver autenticado, permite o acesso ao conteúdo da rota (ex: <Home/>, <Consultas/>)
    return <Outlet />;
};
