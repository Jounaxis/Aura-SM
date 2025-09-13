import { Link } from "react-router-dom";

export default function Menu(){

  return(
    <nav>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/consultas'>Consultas</Link>
        <span> | </span>
        <Link to='/agendas'>Agendas</Link>
        <span> | </span>
        <Link to='/historico'>Histórico</Link>
    </nav>
  )
}