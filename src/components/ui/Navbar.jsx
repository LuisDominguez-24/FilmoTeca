import { useState } from "react";
import { Link } from "react-router-dom";
import '../../Styles/Navbar.css';
import Logo from '../../assets/icons/Logo.png';
import User from '../../assets/icons/User.png';
import Lupa from '../../assets/icons/lupa.png'
import {BarSearch} from './BarSearch.jsx';

export function Navbar() {
    const [showBarSearch, setShowBarSearch] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    const HandleLupaClick = () => {
        if (showBarSearch) {
            setAnimateOut(true);
            setTimeout(() => {
                setShowBarSearch(false);
                setAnimateOut(false);
            }, 300);
        } else {
            setShowBarSearch(true);
        }
    };

    return (
        <>
        <nav className="navbar">
          <div className="navbar__container">
            <ul className="navbar__list">
              <Link to="/"><img src={Logo} alt="Logo" className="navbar_logo" /></Link>
              <li><Link to="/movies">Películas</Link></li>
              <li><Link to="/series">Series</Link></li>
              <li>
                <div className="navbar__separator"></div>
              </li>
            </ul>
            <div className='navbar_right'>
              <ul className="navbar_right-list">
                <li>
                  <a>
                  <img
                    src={Lupa}
                    alt="Buscar"
                    className="Lupa"
                    onClick={HandleLupaClick}
                  />
                  </a>
                </li>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to="/User"><img src={User} alt="User" className="icon" /></Link></li>
              </ul>
            </div>
          </div>
          <div className="search_separator"></div>
          <div className="search_container">
            {showBarSearch && (
              <div className={animateOut ? "barsearch-animate-exit" : "barsearch-animate"}>
                <BarSearch />
              </div>
            )}
          </div>
        </nav>
        <div className="navbar__margin"></div>
        </>
    );
}
