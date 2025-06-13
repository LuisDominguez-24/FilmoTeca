import React from "react";
import { HeroSection } from "./HeroSection";
import { FeaturedMovies } from "./FeaturedMovies";
import { FeaturedSeries } from './FeaturedSeries.jsx';
import "../../Styles/Home.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedMovies />
      <FeaturedSeries />
    </div>
  );
}