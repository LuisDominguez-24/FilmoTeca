import React from "react";
import "../../Styles/Footer.css";

export const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <span>&copy; {new Date().getFullYear()} Películas App</span>
            <span className="footer-links">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <span> | </span>
                <a href="/about">Acerca de</a>
            </span>
        </div>
        <div className="footer-credits">
            Iconos:{" "}
            <a href="https://www.flaticon.es/iconos-gratis/corazon" target="_blank" rel="noopener noreferrer" title="corazón iconos">
                Corazón creados por Freepik
            </a>
            {" | "}
            <a href="https://www.flaticon.es/iconos-gratis/favorito" target="_blank" rel="noopener noreferrer" title="favorito iconos">
                Favorito creados por Aldo Cervantes
            </a>
            {" - "}
            <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
                Flaticon
            </a>
        </div>
    </footer>
);
