import React, { useEffect, useState } from "react";
import "../../Styles/HeroSection.css";
import { get } from "../../Data/httpClient.jsx";
import { BarSearch } from '../ui/BarSearch.jsx';

export function HeroSection() {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    get("/trending/all/day").then(data => {
      const random = data.results[Math.floor(Math.random() * data.results.length)];
      setBackground(random?.backdrop_path);
    });
  }, []);

  return (
    <section
      className="hero-section improved-hero"
      style={{
        backgroundImage: background
          ? `linear-gradient(rgba(20,30,60,0.7),rgba(20,30,60,0.6)), url(https://image.tmdb.org/t/p/original${background})`
          : "none"
      }}
    >
      <div className="hero-overlay improved-hero-overlay">
        <h1 className="hero-title improved-hero-title">Bienvenido.</h1>
        <h2 className="hero-subtitle improved-hero-subtitle">
          Millones de películas, series y gente por descubrir. Explora ya.
        </h2>
        <div className="hero-barsearch-wrapper">
          <BarSearch />
        </div>
      </div>
    </section>
  );
}