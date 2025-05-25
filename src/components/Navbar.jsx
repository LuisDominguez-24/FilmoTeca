import { Link } from "react-router-dom";
import '../Styles/Navbar.css';
import Logo from '../Utils/Logo.png'

export function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
            <Link to="/"><img src={Logo} alt="Logo" className="navbar_logo" /></Link>
                <li>
                    <input 
                        type="text" 
                        className="navbar__search" 
                        placeholder="Buscar en Filmoteca" 
                        aria-label="Buscar"
                    />
                </li>
                <li>
                    <div className="navbar__separator"></div>
                </li>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/movies">Películas</Link></li>
                <li><Link to="/series">Series</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
            </ul>
        </nav>
    );
}
