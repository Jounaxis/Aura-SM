import { Link } from "react-router-dom";

export default function Menu(){

  return(
    <nav>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/consultas'>Consultas</Link>
        <span> | </span>
        <Link to='/agendar'>Agendar</Link>
        <span> | </span>
        <Link to='/historico'>Histórico</Link>
        <span> | </span>
        <Link to='/integrantes'>Integrantes</Link>
    </nav>
  )
}