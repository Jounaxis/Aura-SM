import { Link } from "react-router-dom";

export default function Menu(){

  return(
    <nav>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/sobre'>Sobre</Link>
        <span> | </span>
        <Link to='/faq'>FAQ</Link>
        <span> | </span>
        <Link to='/integrantes'>Integrantes</Link>
    </nav>
  )
}