import { Link } from "react-router-dom";
import '../../Styles/Navbar.css';
import Logo from '../../assets/icons/Logo.png';
import {BarSearch} from './BarSearch.jsx';

export function Navbar() {
    return (
        <>
        <nav className="navbar">
            <ul className="navbar__list">
            <Link to="/"><img src={Logo} alt="Logo" className="navbar_logo" /></Link>
                <li><Link to="/movies">Películas</Link></li>
                <li><Link to="/series">Series</Link></li>
                <li>
                    <div className="navbar__separator"></div>
                </li>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
            </ul>
        </nav>
        <BarSearch />
        </>
    );
}
