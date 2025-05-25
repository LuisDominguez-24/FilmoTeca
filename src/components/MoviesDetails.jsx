import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/MovieDetails.css";
import { get } from "../Data/httpClient.jsx";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        get(`/movie/${id}`)
            .then(data => setMovie(data))
            .catch(() => setMovie(null))
            .finally(() => setLoading(false));
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

    return (
        <div className="movie-details__container">
            <Link to="/movies" className="movie-details__back">← Volver</Link>
            <div className="movie-details__card">
                <img
                    className="movie-details__poster"
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/no-image.jpg"}
                    alt={movie.title}
                />
                <div className="movie-details__info">
                    <h2 className="movie-details__title">{movie.title}</h2>
                    <p className="movie-details__subtitle">{movie.tagline}</p>
                    <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
                    <p><strong>Duración:</strong> {movie.runtime} min</p>
                    <p><strong>Géneros:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
                    <p className="movie-details__overview"><strong>Descripción:</strong> {movie.overview}</p>
                    <p><strong>Puntuación:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                </div>
            </div>
        </div>
    );
};