import React, { useEffect, useState } from "react";
import "../../Styles/HeroSection.css";
import { get } from "../../Data/httpClient.jsx";
import { BarSearch } from '../ui/BarSearch.jsx';

const ZOOM_DURATION = 20000;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function HeroSection() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    get("/trending/all/day").then(data => {
      const images = data.results.map(item => item.backdrop_path).filter(Boolean);
      setBackgrounds(shuffleArray(images));
    });
  }, []);

  useEffect(() => {
    if (backgrounds.length < 2) return;
    const interval = setInterval(() => {
      setFade(false); // Fade-out de la imagen actual
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % backgrounds.length);
        setFade(true); // Fade-in de la nueva imagen
      }, 600);
    }, ZOOM_DURATION);
    return () => clearInterval(interval);
  }, [backgrounds]);

  const background = backgrounds[current];

  return (
    <section className="hero-section improved-hero">
      <div
        className={`hero-bg ${fade ? 'fade-in' : 'fade-out'}`}
        style={{
          backgroundImage: background
            ? `linear-gradient(rgba(20,30,60,0.7),rgba(20,30,60,0.6)), url(https://image.tmdb.org/t/p/original${background})`
            : "none"
        }}
      />
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