import React from "react";
import { useNavigate } from "react-router-dom";
import { GenderCard } from "./GenderCard";

export const GenderMovies = ({ movies }) => {
  const navigate = useNavigate();
  const similarMovies = movies.filter((m) => m.id).slice(0, 7);

  return (
    <div className="gender-movies-container">
      <div className="gender-movies-list">
        {similarMovies.map((movie) => (
          <GenderCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
