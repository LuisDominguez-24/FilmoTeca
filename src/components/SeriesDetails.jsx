import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/MovieDetails.css";
import { get } from "../Data/httpClient.jsx";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const SeriesDetails = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        get(`/tv/${id}`)
            .then(data => setSerie(data))
            .catch(() => setSerie(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="movie-details__loading">Cargando...</div>;
    }

    if (!serie) {
        return (
            <div className="movie-details__error">
                <p>No se encontró la serie.</p>
                <Link to="/series" className="movie-details__back">Volver</Link>
            </div>
        );
    }

    return (
        <div className="movie-details__container">
            <Link to="/series" className="movie-details__back">← Volver</Link>
            <div className="movie-details__card">
                <img
                    className="movie-details__poster"
                    src={serie.poster_path ? `${IMAGE_BASE_URL}${serie.poster_path}` : "/no-image.jpg"}
                    alt={serie.name}
                />
                <div className="movie-details__info">
                    <h2 className="movie-details__title">{serie.name}</h2>
                    <p className="movie-details__subtitle">{serie.tagline}</p>
                    <p><strong>Fecha de estreno:</strong> {serie.first_air_date}</p>
                    <p><strong>Último episodio:</strong> {serie.last_air_date}</p>
                    <p><strong>Temporadas:</strong> {serie.number_of_seasons}</p>
                    <p><strong>Episodios:</strong> {serie.number_of_episodes}</p>
                    <p><strong>Géneros:</strong> {serie.genres.map(g => g.name).join(", ")}</p>
                    <p className="movie-details__overview"><strong>Descripción:</strong> {serie.overview}</p>
                    <p><strong>Puntuación:</strong> {serie.vote_average?.toFixed(1)} / 10</p>
                </div>
            </div>
        </div>
    );
};