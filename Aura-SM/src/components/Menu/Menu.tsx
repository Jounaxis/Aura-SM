import { NavLink, useNavigate } from "react-router-dom";

export default function Menu(){
  const navigate = useNavigate();

  const getLink = ({ isActive }: { isActive: boolean }) =>
    `no-underline font-medium transition-colors text-base pb-1 ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const handleLogout = () => {

    localStorage.removeItem('userToken');

    navigate('/', { replace: true });
  };

  return(
    <nav className="flex items-center gap-6 border-l pl-6">
      <NavLink to='/home' className={getLink}>Home</NavLink>
      <NavLink to='/agendar' className={getLink}>Agendar</NavLink>
      <NavLink to='/consultas' className={getLink}>Consultas</NavLink>
      <NavLink to='/historico' className={getLink}>Histórico</NavLink>
      <NavLink to='/sobre' className={getLink}>Sobre</NavLink>
      <NavLink to='/faq' className={getLink}>FAQ</NavLink>
      <NavLink to='/integrantes' className={getLink}>Integrantes</NavLink>
      <NavLink to='/contato' className={getLink}>Contato</NavLink>

      <button 
        onClick={handleLogout}
        className="no-underline font-medium transition-colors text-base text-red-600 hover:text-red-800 border-l border-gray-300 pl-6 py-0.5"
      >
        Sair
      </button>
    </nav>
  )
}
