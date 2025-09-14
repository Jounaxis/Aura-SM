import { Link } from "react-router-dom";

export default function Menu(){

  return(
    <nav>
        <Link to='/'>Home</Link>

        <Link to='/consultas'>Consultas</Link>

        <Link to='/agendas'>Agendas</Link>

        <Link to='/historico'>Histórico</Link>
    </nav>
  )
}