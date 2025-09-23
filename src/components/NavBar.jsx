import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./Logo";
import { removeToken } from "../utils/token";

import "./styles/NavBar.css";

function NavBar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  // A função signOut remove o token do armazenamento local,
  // redireciona os usuários de volta para a página de login e
  // define isLoggedIn como false.
  const signOut = () => {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>
      <ul className="navbar__nav">
        <li>
          <NavLink to="/ducks" className="navbar__link">
            Ducks
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-profile" className="navbar__link">
            Meu perfil
          </NavLink>
        </li>
        <li>
          <button className="navbar__link navbar__button" onClick={signOut} >
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
