import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/clientes">Clientes</NavLink>
        </li>
        <li>
          <NavLink to="/produtos">Produtos</NavLink>
        </li>
        <li>
          <NavLink to="/pedidos">Pedidos</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
