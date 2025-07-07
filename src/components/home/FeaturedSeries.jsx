import React, { useEffect, useState, useRef } from "react";
import "../../Styles/FeaturedMovies.css";
import { get } from "../../Data/httpClient.jsx";
import { GenderCardSeries } from "../gender/GenderCardSeries";
import { useNavigate } from "react-router-dom";

const FILTERS = [
	{ label: "Tendencia", value: "trending" },
	{ label: "Mejor Calificadas", value: "top_rated" },
	{ label: "En Transmision", value: "on_air" },
	{ label: "Próximamente", value: "upcoming" }
];

function FeaturedSeriesCarousel({ filter }) {
	const [series, setSeries] = useState([]);
	const navigate = useNavigate();
	const carouselRef = useRef(null);

	useEffect(() => {
		let endpoint = "";
		if (filter === "trending") endpoint = "/trending/tv/day";
		else if (filter === "top_rated") endpoint = "/tv/top_rated";
		else if (filter === "on_air") endpoint = "/tv/on_the_air";
		else if (filter === "upcoming") endpoint = "/tv/upcoming";
		get(endpoint).then(data => setSeries(data.results || []));
	}, [filter]);

	return (
		<div className="featured-block clean-featured-block">
			<div className="featured-header clean-featured-header">
				<h2 className="featured-title">
					Series {FILTERS.find(f => f.value === filter).label}
				</h2>
			</div>
			<div className="carousel-wrapper">
				<div
					className="featured-list clean-featured-list scroll-x"
					ref={carouselRef}
				>
					{series.map((serie, idx) => (
						<GenderCardSeries
							key={serie.id + "-" + idx}
							serie={serie}
							onClick={() => navigate(`/series/${serie.id}`)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export function FeaturedSeries() {
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
					<div className="filter-slider-bg" style={sliderStyle} />
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
			<FeaturedSeriesCarousel filter={filter} />
		</section>
	);
}