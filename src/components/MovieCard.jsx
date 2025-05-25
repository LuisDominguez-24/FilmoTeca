import '../Styles/MovieCard.css';
import { useNavigate } from "react-router-dom";

export function MovieCard({ movie }) {
    const navigate = useNavigate();
    const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;

    const handleClick = () => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <li className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="movie-poster">
                <img 
                    width={230} 
                    height={345} 
                    src={imageUrl || "/placeholder.svg"} 
                    alt={movie.title} 
                />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-description">{movie.overview}</p>
                <div className="movie-details">
                    <span className="movie-rating">
                        <i className="rating-icon">★</i> {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="movie-date">{movie.release_date}</span>
                </div>
            </div>
        </li>
    );
}
