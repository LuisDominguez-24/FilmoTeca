import React from "react";
import "../../Styles/GenderCard.css";

export function GenderCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  return (
    <div className="gender-card" tabIndex={0} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="gender-card__poster">
        <img
          src={imageUrl}
          alt={movie.title}
          className="gender-card__img"
          loading="lazy"
        />
      </div>
      <div className="gender-card__info">
        <h3 className="gender-card__title">{movie.title}</h3>
        <div className="gender-card__meta">
          <span className="gender-card__rating">
            <i className="gender-card__star">★</i> {movie.vote_average?.toFixed(1) ?? "N/A"}
            <span className="gender-card__date">{movie.release_date}</span>
          </span>
        </div>
      </div>
    </div>
  );
}