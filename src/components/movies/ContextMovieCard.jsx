import { useState, useEffect } from 'react';
import { get } from '../../Data/httpClient.jsx';
import { MovieCard } from './MovieCard.jsx';
import '../../Styles/MovieCard.css';

const FILTERS = [
  { label: "Popular", value: "popular", endpoint: "/movie/popular " },
  { label: "Cartelera", value: "now_playing", endpoint: "/movie/now_playing" },
  { label: "Próximo", value: "upcoming", endpoint: "/movie/upcoming" },
  { label: "Mejor calificado", value: "top_rated", endpoint: "/movie/top_rated" },
];

export function ContextMovieCard() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(FILTERS[0].value);

  useEffect(() => {
    const selected = FILTERS.find(f => f.value === filter);
    get(selected.endpoint).then((data) => {
      setMovies(data.results || []);
    });
  }, [filter]);

  return (
    <div>
      <div className="movie-filters" style={{ marginBottom: "1.5em", display: "flex", gap: "1em" }}>
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`movie-filter-btn${filter === f.value ? " active" : ""}`}
            onClick={() => setFilter(f.value)}
            style={{
              padding: "0.5em 1.2em",
              borderRadius: "1.5em",
              border: "none",
              background: filter === f.value ? "#1a2364" : "#23243a",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: filter === f.value ? "0 2px 8px #1a236488" : "none",
              transition: "background 0.2s"
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}