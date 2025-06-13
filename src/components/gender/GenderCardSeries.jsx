import React from "react";
import "../../Styles/GenderCard.css";

export function GenderCardSeries({ serie, onClick }) {
  const imageUrl = serie.poster_path
    ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
    : "/no-image.jpg";

  return (
    <div className="gender-card" tabIndex={0} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="gender-card__poster">
        <img
          src={imageUrl}
          alt={serie.name}
          className="gender-card__img"
          loading="lazy"
        />
      </div>
      <div className="gender-card__info">
        <h3 className="gender-card__title">{serie.name}</h3>
        <div className="gender-card__meta">
          <span className="gender-card__rating">
            <i className="gender-card__star">★</i> {serie.vote_average?.toFixed(1) ?? "N/A"}
          </span>
          <span className="gender-card__date">{serie.first_air_date}</span>
        </div>
      </div>
    </div>
  );
}