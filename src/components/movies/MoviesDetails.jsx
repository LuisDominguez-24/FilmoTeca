import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/MovieDetails.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderMovies } from "../gender/GenderMovies.jsx";
import HeartIcon from "../../assets/icons/favorito.png"
import HeartFilledIcon from "../../assets/icons/Heart.png"
import WatchLate from "../../assets/icons/LateWatch.png";
import Like from "../../assets/icons/Like.png";
import NoLike from "../../assets/icons/NoLike.png";
import DislikeFalse from "../../assets/icons/dislikeFalse.png";
import DislikeTrue from "../../assets/icons/dislikeTrue.png";

// Asegúrate de tener Font Awesome en tu index.html o instala react-icons
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(() => {
        setLoading(true);
        get(`/movie/${id}?append_to_response=similar`)
            .then(data => setMovie(data))
            .catch(() => setMovie(null))
            .finally(() => setLoading(false));

        // Obtener el trailer
        get(`/movie/${id}/videos`)
            .then(data => {
                const trailer = data.results?.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailerKey(trailer ? trailer.key : null);
            });
    }, [id]);

    if (loading) {
        return <div className="movie-details__loading">Cargando...</div>;
    }

    if (!movie) {
        return (
            <div className="movie-details__error">
                <p>No se encontró la película.</p>
                <Link to="/" className="movie-details__back">Volver</Link>
            </div>
        );
    }

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleDislikeClick = () => {
        setIsDisliked(!isDisliked);
    };

    return (
        <>
        <div className="movie-details__container">
            <Link to="/movies" className="movie-details__back">← Volver</Link>
            <div className="movie-details__card movie-details__card--compact">
                <img
                    className="movie-details__poster"
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/no-image.jpg"}
                    alt={movie.title}
                />
                <div className="movie-details__info">
                    <h2 className="movie-details__title">{movie.title}</h2>
                    <p className="movie-details__subtitle">{movie.tagline}</p>
                    <div className="movie-details__meta">
                        <span><strong>Estreno:</strong> {movie.release_date}</span>
                        <span><strong>Duración:</strong> {movie.runtime} min</span>
                        <span><strong>Géneros:</strong> {movie.genres.map(g => g.name).join(", ")}</span>
                    </div>
                    <div className="movie-details__overview">
                        <strong>Resumen:</strong>
                        <div>{movie.overview}</div>
                    </div>
                    <div className="movie-details__score-row">
                        <span className="movie-details__score">
                            <i className="fa-solid fa-star" style={{color: "#ffb400"}}></i> {movie.vote_average?.toFixed(1)} / 10
                        </span>
                        {trailerKey && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="movie-details__trailer-btn"
                            >
                                <i className="fa-brands fa-youtube"></i> Ver tráiler
                            </a>
                        )}
                    </div>
                    <div className="movie-details__actions">
                        <button className="circle-btn" title="Favoritos" alt="Agregar a favoritos" onClick={handleFavoriteClick}>
                            <img 
                                src={isFavorite ? HeartFilledIcon : HeartIcon} 
                                alt="Favorito" 
                                className="favorite-icon" 
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                        <button className="circle-btn" title="Ver más tarde" alt="Agregar a ver más tarde">
                            <img 
                                src={WatchLate} 
                                alt="Ver más tarde" 
                                className="watch-late-icon" 
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                        <button className="circle-btn" title="Me gusta" alt="Marcar como me gusta">
                            <img 
                                src={isLiked ? Like : NoLike} 
                                alt="Me gusta" 
                                className="like-icon" 
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                                onClick={handleLikeClick}
                            />
                        </button>
                        <button className="circle-btn" title="No me gusta">
                            <img 
                                src={isDisliked ? DislikeTrue : DislikeFalse} 
                                alt="No me gusta" 
                                className="dislike-icon" 
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                                onClick={handleDislikeClick}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <GenderMovies movies={movie.similar?.results || []} />
        </div>
        </>
    );
};