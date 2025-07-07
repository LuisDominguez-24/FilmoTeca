import { useRef, useEffect, useState } from "react";
import "../../Styles/FeaturedMovies.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderCard } from "../gender/GenderCard";
import { useNavigate } from "react-router-dom";

const FILTERS = [
  { label: "Tendencia", value: "trending" },
  { label: "Mejor Calificadas", value: "top_rated" },
  { label: "En cartelera", value: "now_playing" },
  { label: "Próximamente", value: "upcoming" }
];
const VISIBLE_CARDS = 8;

function FeaturedMoviesCarousel({ filter }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    let endpoint = "";
    if (filter === "trending") endpoint = "/trending/movie/day";
    else if (filter === "top_rated") endpoint = "/movie/top_rated";
    else if (filter === "now_playing") endpoint = "/movie/now_playing";
    else if (filter === "upcoming") endpoint = "/movie/upcoming";
    get(endpoint).then(data => setMovies(data.results || []));
  }, [filter]);

  return (
    <div className="featured-block clean-featured-block">
      <div className="featured-header clean-featured-header">
        <h2 className="featured-title">
          Películas {FILTERS.find(f => f.value === filter).label}
        </h2>
      </div>
      <div className="carousel-wrapper">
        <div
          className="featured-list clean-featured-list scroll-x"
          ref={carouselRef}
        >
          {movies.map((movie, idx) => (
            <GenderCard
              key={movie.id + "-" + idx}
              movie={movie}
              onClick={() => navigate(`/movies/${movie.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedMovies() {
  const [filter, setFilter] = useState(FILTERS[0].value);
  const [sliderStyle, setSliderStyle] = useState({});
  const filtersRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const idx = FILTERS.findIndex(f => f.value === filter);
    if (filtersRef.current[idx] && containerRef.current) {
      const btn = filtersRef.current[idx];
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setSliderStyle({
        left: btnRect.left - containerRect.left + "px",
        width: btnRect.width + "px"
      });
    }
  }, [filter]);

  return (
    <section className="featured-section clean-featured">
      <div className="featured-header clean-featured-header">
        <div className="featured-filters" ref={containerRef}>
          <div className="filter-slider-bg" style={sliderStyle}></div>
          {FILTERS.map((f, idx) => (
            <button
              key={f.value}
              ref={el => filtersRef.current[idx] = el}
              className={`featured-filter-btn${filter === f.value ? " active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <FeaturedMoviesCarousel filter={filter} />
    </section>
  );
}