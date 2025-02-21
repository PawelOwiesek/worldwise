import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <ul>
      <li>
        <NavLink to="/">HomePage</NavLink>
      </li>
      <li>
        <NavLink to="/Pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/Product">Product</NavLink>
      </li>
    </ul>
  );
}

export default NavBar;
