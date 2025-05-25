import '../Styles/MovieCard.css';
import { useNavigate } from "react-router-dom";

export function SeriesCard({ serie }) {
    const navigate = useNavigate();
    const imageUrl = "https://image.tmdb.org/t/p/w300" + serie.poster_path;

    const handleClick = () => {
        navigate(`/series/${serie.id}`);
    };

    return (
        <li className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="movie-poster">
                <img 
                    width={230} 
                    height={345} 
                    src={imageUrl || "/placeholder.svg"} 
                    alt={serie.name} 
                />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{serie.name}</h3>
                <p className="movie-description">{serie.overview}</p>
                <div className="movie-details">
                    <span className="movie-rating">
                        <i className="rating-icon">★</i> {serie.vote_average?.toFixed(1)}
                    </span>
                    <span className="movie-date">{serie.first_air_date}</span>
                </div>
            </div>
        </li>
    );
}