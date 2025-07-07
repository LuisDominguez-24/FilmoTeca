import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenderCardSeries } from "./GenderCardSeries";
import "../../Styles/GenderCarousel.css";

export const GenderSeries = ({ series }) => {
  const navigate = useNavigate();
  const similarSeries = series.filter((s) => s.id).slice(0, 25);
  const listRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const getCardsPerView = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    if (window.innerWidth < 1600) return 4;
    return 5;
  };

  const scrollBySection = (dir) => {
    const container = listRef.current;
    if (!container) return;
    const card = container.querySelector(".gender-card");
    if (!card) return;
    const cardsPerView = getCardsPerView();
    const scrollAmount = card.offsetWidth * cardsPerView + 24 * (cardsPerView - 1);
    container.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    setTimeout(() => setScrollPos(container.scrollLeft), 350);
  };

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  React.useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const update = () => {
      setShowLeft(container.scrollLeft > 0);
      setShowRight(container.scrollLeft + container.offsetWidth < container.scrollWidth - 5);
    };
    update();
    container.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="gender-movies-container improved-gender-container">
      {showLeft && (
        <button
          className="gender-arrow gender-arrow-left"
          onClick={() => scrollBySection(-1)}
          aria-label="Ver anteriores"
        >
          &#8592;
        </button>
      )}
      <div className="gender-movies-list improved-gender-list" ref={listRef}>
        {similarSeries.map((serie, idx) => (
          <GenderCardSeries
            key={serie.id}
            serie={serie}
            onClick={() => navigate(`/series/${serie.id}`)}
            style={{ animationDelay: `${idx * 0.04}s` }}
          />
        ))}
      </div>
      {showRight && (
        <button
          className="gender-arrow gender-arrow-right"
          onClick={() => scrollBySection(1)}
          aria-label="Ver siguientes"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};
