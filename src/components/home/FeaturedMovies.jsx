import React, { useEffect, useState } from "react";
import "../../Styles/FeaturedMovies.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderCard } from "../gender/GenderCard";

const CARDS_PER_PAGE = 20;

function FeaturedCarousel({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    get(endpoint).then(data => setMovies(data.results || []));
    setPage(0); // Reset page when endpoint changes
  }, [endpoint]);

  const maxPage = Math.max(0, Math.ceil(movies.length / CARDS_PER_PAGE) - 1);

  const handlePrev = () => setPage(p => Math.max(0, p - 1));
  const handleNext = () => setPage(p => Math.min(maxPage, p + 1));

  const start = page * CARDS_PER_PAGE;
  const visibleMovies = movies.slice(start, start + CARDS_PER_PAGE);

  return (
    <div className="featured-block">
      <div className="featured-header improved-featured-header">
        <h2 className="featured-title">{title}</h2>
        <div className="carousel-arrows">
          <button className="carousel-arrow" onClick={handlePrev} disabled={page === 0}>&lt;</button>
          <button className="carousel-arrow" onClick={handleNext} disabled={page === maxPage}>&gt;</button>
        </div>
      </div>
      <div className="featured-list improved-featured-list small-cards">
        {visibleMovies.map(movie => (
          <GenderCard key={movie.id} movie={movie} small />
        ))}
      </div>
    </div>
  );
}

export function FeaturedMovies() {
  return (
    <section className="featured-section improved-featured">
      <FeaturedCarousel title="Películas en Tendencia" endpoint="/trending/movie/day" />
      <FeaturedCarousel title="Películas Mejor Calificadas" endpoint="/movie/top_rated" />
    </section>
  );
}