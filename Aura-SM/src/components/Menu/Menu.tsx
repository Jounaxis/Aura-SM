import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

export default function Menu(){

  const getLink = ({ isActive }: NavLinkRenderProps) =>
  `no-underline font-medium transition-colors text-base ${
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-600"
  }`;

  return(
    <nav className="flex items-center gap-6 border-l pl-6">
      <NavLink to='/' className={getLink}>Home</NavLink>
      <NavLink to='/agendar' className={getLink}>Agendar</NavLink>
      <NavLink to='/consultas' className={getLink}>Consultas</NavLink>
      <NavLink to='/historico' className={getLink}>Histórico</NavLink>
      <NavLink to='/sobre' className={getLink}>Sobre</NavLink>
      <NavLink to='/faq' className={getLink}>FAQ</NavLink>
      <NavLink to='/integrantes' className={getLink}>Integrantes</NavLink>
      <NavLink to='/contato' className={getLink}>Contato</NavLink>
    </nav>
  )
}