import React, { useEffect, useState } from "react";
import "../../Styles/FeaturedMovies.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderCardSeries } from "../gender/GenderCardSeries";

const FILTERS = [
  { label: "Tendencia", value: "trending" },
  { label: "Mejor Calificadas", value: "top_rated" },
];

export function FeaturedSeries() {
  const [filter, setFilter] = useState(FILTERS[0].value);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    let endpoint = "";
    if (filter === "trending") endpoint = "/trending/tv/day";
    else if (filter === "top_rated") endpoint = "/tv/top_rated";
    get(endpoint).then(data => setSeries(data.results || []));
  }, [filter]);

  return (
    <section className="featured-section improved-featured">
      <div className="featured-header improved-featured-header">
        <h2 className="featured-title">Series {FILTERS.find(f => f.value === filter).label}</h2>
        <div className="featured-filters">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`featured-filter-btn${filter === f.value ? " active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="featured-list improved-featured-list">
        {series.slice(0, 8).map(serie => (
          <GenderCardSeries key={serie.id} serie={serie} />
        ))}
      </div>
    </section>
  );
}