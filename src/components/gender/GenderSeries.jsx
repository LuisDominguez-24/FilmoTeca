import React from "react";
import { useNavigate } from "react-router-dom";
import { GenderCardSeries } from "./GenderCardSeries";

export const GenderSeries = ({ series }) => {
  const navigate = useNavigate();
  const similarSeries = series.filter((s) => s.id).slice(0, 6);

  return (
    <div className="gender-movies-container">
      <div className="gender-movies-list">
        {similarSeries.map((serie) => (
          <GenderCardSeries
            key={serie.id}
            serie={serie}
            onClick={() => navigate(`/series/${serie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
