import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/cadastros/clientes">Clientes</NavLink>
        </li>
        <li>
          <NavLink to="/cadastros/produtos">Produtos</NavLink>
        </li>
        <li>
          <NavLink to="/cadastros/pedidos">Pedidos</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
