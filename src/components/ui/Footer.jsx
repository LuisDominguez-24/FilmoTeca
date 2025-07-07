import '../../Styles/footer.css';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {/* Sección 1: Redes Sociales */}
      <div className="footer-section">
        <h3 className="section-title">Contacto Desarrollador</h3>
        <div className="social-links">
          <a href="https://github.com/LuisDominguez-24" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://twitter.com/tu_usuario" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>

      {/* Sección 2: Créditos TMDB */}
      <div className="footer-section">
        <h3 className="section-title">Powered by</h3>
        <div className="tmdb-credits">
          <div className="tmdb-logo-space">
            {/* Espacio reservado para logo de TMDB */}
            <a href='https://www.themoviedb.org/' className="tmdb-placeholder">TMDB</a>
          </div>
          <p>Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.</p>
        </div>
      </div>

      {/* Sección 3: Enlaces y Copyright */}
      <div className="footer-section">
        <h3 className="section-title">Información</h3>
        <div className="footer-links">
          <a href="/about">Acerca de</a>
          <a href="/privacy">Privacidad</a>
          <a href="/terms">Términos</a>
        </div>
        <div className="footer-credits">
          <p>
            Iconos por{" "}
            <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
              Flaticon
            </a>
          </p>
        </div>
      </div>
    </div>

    {/* Copyright al final */}
    <div className="footer-bottom">
      <span>&copy; {new Date().getFullYear()} Filmoteca por Luis Domínguez</span>
    </div>
  </footer>
)
