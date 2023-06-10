import { NavLink } from 'react-router-dom';
import "./css/Nav.css";

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/cadastros/clientes">Cadastros</NavLink></li>
        {/* <li><NavLink to="/definir">Definir</NavLink></li>
        <li><NavLink to="/deiinfr">Definir</NavLink></li> */}
        <li><NavLink to="/Util">Util</NavLink></li>
        <li><NavLink to="/sobre">Sobre</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;