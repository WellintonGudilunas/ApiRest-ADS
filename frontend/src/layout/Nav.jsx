import { NavLink } from 'react-router-dom';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/clientes">Cadastros</NavLink></li>
        <li><NavLink to="/definir">Definir</NavLink></li>
        <li><NavLink to="/definir">Definir</NavLink></li>
        <li><NavLink to="/definir">Definir</NavLink></li>
        <li><NavLink to="/sobre">Sobre</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;