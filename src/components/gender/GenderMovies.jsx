import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GenderCard } from "./GenderCard";
import "../../Styles/GenderCarousel.css";

export const GenderMovies = ({ movies }) => {
  const navigate = useNavigate();
  const similarMovies = movies.filter((m) => m.id).slice(0, 25);

  // Responsive: cards visibles según pantalla
  const getCardsPerView = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 4;
    if (window.innerWidth < 1600) return 6;
    return 8;
  };

  const cardWidth = 188;
  const cardGap = 0; // Espacio entre cards

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerView, movies.length]);

  // Calcula el desplazamiento en px
  const translateX = -(currentIndex * (cardWidth + cardGap));

  // Flechas solo si hay más para mostrar
  const showLeft = currentIndex > 0;
  const showRight = currentIndex + cardsPerView < similarMovies.length;

  const handleArrow = (dir) => {
    setCurrentIndex((prev) => {
      const next = prev + dir * cardsPerView;
      if (next < 0) return 0;
      if (next > similarMovies.length - cardsPerView)
        return Math.max(similarMovies.length - cardsPerView, 0);
      return next;
    });
  };

  // Calcula el ancho exacto del viewport para mostrar solo cards completas
  const viewportWidth = cardsPerView * cardWidth;

  return (
    <div className="center-carousel-container">
      {showLeft && (
        <button
          className="center-carousel-arrow custom-dark left"
          onClick={() => handleArrow(-1)}
          aria-label="Ver anteriores"
          style={{ marginRight: "1rem" }}
        >
          <span className="arrow-icon">&#8592;</span>
        </button>
      )}
      <div
        className="center-carousel-viewport"
        style={{
          width: `${viewportWidth}px`,
          maxWidth: "100vw",
        }}
      >
        <div
          className="center-carousel-list slide"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.5s cubic-bezier(.4,1.6,.6,1)",
            width: `${similarMovies.length * (cardWidth + cardGap)}px`,
            gap: `${cardGap}px`,
          }}
        >
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              style={{
                width: `${cardWidth}px`,
                minWidth: `${cardWidth}px`,
                maxWidth: `${cardWidth}px`,
              }}
            >
              <GenderCard
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
      {showRight && (
        <button
          className="center-carousel-arrow custom-dark right"
          onClick={() => handleArrow(1)}
          aria-label="Ver siguientes"
          style={{ marginLeft: "1rem" }}
        >
          <span className="arrow-icon">&#8594;</span>
        </button>
      )}
    </div>
  );
};
