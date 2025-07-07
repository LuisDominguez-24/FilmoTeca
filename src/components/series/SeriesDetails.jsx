import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/MovieDetails.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderSeries } from "../gender/GenderSeries.jsx";
import HeartIcon from "../../assets/icons/favorito.png"
import HeartFilledIcon from "../../assets/icons/Heart.png"
import WatchLate from "../../assets/icons/LateWatch.png";
import Like from "../../assets/icons/Like.png";
import NoLike from "../../assets/icons/NoLike.png";
import DislikeFalse from "../../assets/icons/dislikeFalse.png";
import DislikeTrue from "../../assets/icons/dislikeTrue.png";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const SeriesDetails = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [favClicked, setFavClicked] = useState(false);
    const [lateClicked, setLateClicked] = useState(false);
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    useEffect(() => {
        setLoading(true);
        get(`/tv/${id}?append_to_response=similar`)
            .then(data => setSerie(data))
            .catch(() => setSerie(null))
            .finally(() => setLoading(false));

        get(`/tv/${id}/videos`)
            .then(data => {
                const trailer = data.results?.find(
                  v => (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
                ) || data.results?.find(v => v.site === "YouTube");
                setTrailerKey(trailer ? trailer.key : null);
            })
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

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setFavClicked(true);
        setTimeout(() => setFavClicked(false), 400);
    };
    const handleLateClick = () => {
        setLateClicked(true);
        setTimeout(() => setLateClicked(false), 400);
    };
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setLikeClicked(true);
        setTimeout(() => setLikeClicked(false), 400);
    };
    const handleDislikeClick = () => {
        setIsDisliked(!isDisliked);
        setDislikeClicked(true);
        setTimeout(() => setDislikeClicked(false), 400);
    };

    return (
        <>
        <div className="movie-details__container">
            <Link to="/series" className="movie-details__back">← Volver</Link>
            <div className="movie-details__card movie-details__card--compact">
                <img
                    className="movie-details__poster"
                    src={serie.poster_path ? `${IMAGE_BASE_URL}${serie.poster_path}` : "/no-image.jpg"}
                    alt={serie.name}
                />
                <div className="movie-details__info">
                    <h2 className="movie-details__title">{serie.name}</h2>
                    <p className="movie-details__subtitle">{serie.tagline}</p>
                    <div className="movie-details__meta">
                        <span><strong>Estreno:</strong> {serie.first_air_date}</span>
                        <span><strong>Último episodio:</strong> {serie.last_air_date}</span>
                        <span><strong>Temporadas:</strong> {serie.number_of_seasons}</span>
                        <span><strong>Episodios:</strong> {serie.number_of_episodes}</span>
                        <span><strong>Géneros:</strong> {serie.genres?.map(g => g.name).join(", ")}</span>
                    </div>
                    {/* Solo muestra el resumen si existe */}
                    {serie.overview && serie.overview.trim() !== "" && (
                      <div className="movie-details__overview">
                          <strong>Resumen:</strong>
                          <div>{serie.overview}</div>
                      </div>
                    )}
                    <div className="movie-details__score-row">
                        <span className="movie-details__score">
                            <i className="fa-solid fa-star" style={{color: "#ffb400"}}>★ </i> {serie.vote_average?.toFixed(1)} / 10
                        </span>
                        {trailerKey && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="movie-details__trailer-btn"
                            >
                                <i className="fa-brands fa-youtube"></i>
                                Ver tráiler
                            </a>
                        )}
                    </div>
                    {/* Botones de acciones */}
                    <div className="movie-details__actions">
                        <button
                            className={`circle-btn favorite-btn${favClicked ? " clicked" : ""}`}
                            title="Favoritos"
                            alt="Agregar a favoritos"
                            onClick={handleFavoriteClick}
                        >
                            <img 
                                src={isFavorite ? HeartFilledIcon : HeartIcon} 
                                alt="Favorito" 
                                className="favorite-icon"
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                        <button
                            className={`circle-btn late-btn${lateClicked ? " clicked" : ""}`}
                            title="Ver más tarde"
                            alt="Agregar a ver más tarde"
                            onClick={handleLateClick}
                        >
                            <img 
                                src={WatchLate} 
                                alt="Ver más tarde" 
                                className="watch-late-icon"
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                        <button
                            className={`circle-btn like-btn${likeClicked ? " clicked" : ""}`}
                            title="Me gusta"
                            alt="Marcar como me gusta"
                            onClick={handleLikeClick}
                        >
                            <img 
                                src={isLiked ? Like : NoLike} 
                                alt="Me gusta" 
                                className="like-icon"
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                        <button
                            className={`circle-btn dislike-btn${dislikeClicked ? " clicked" : ""}`}
                            title="No me gusta"
                            alt="Marcar como no me gusta"
                            onClick={handleDislikeClick}
                        >
                            <img 
                                src={isDisliked ? DislikeTrue : DislikeFalse} 
                                alt="No me gusta" 
                                className="dislike-icon"
                                style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <GenderSeries series={serie.similar?.results || []} />
        </div>
        </>
    );
};