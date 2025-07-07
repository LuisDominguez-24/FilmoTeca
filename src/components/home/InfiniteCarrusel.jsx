// Aplica para FeaturedCarousel y FeaturedSeriesCarousel
import React, { useEffect, useRef, useState } from "react";
import "../../Styles/FeaturedMovies.css";

const VISIBLE_CARDS = 8;

export function InfiniteCarousel({ items, CardComponent, onCardClick, title }) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const carouselRef = useRef(null);

  // Animación automática al cargar (igual que en Series)
  useEffect(() => {
    if (!isAutoScrolling || items.length === 0) return;

    let animationFrame;
    const el = carouselRef.current;
    if (!el) return;

    const animate = () => {
      el.scrollLeft += 0.7;
      // Detener al llegar al final
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        setIsAutoScrolling(false);
        return;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    // Detener animación al interactuar
    const stopAutoScroll = () => {
      setIsAutoScrolling(false);
    };

    el.addEventListener("mousedown", stopAutoScroll);
    el.addEventListener("touchstart", stopAutoScroll);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      el.removeEventListener("mousedown", stopAutoScroll);
      el.removeEventListener("touchstart", stopAutoScroll);
    };
  }, [isAutoScrolling, items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="featured-block clean-featured-block">
      <div className="featured-header clean-featured-header">
        <h2 className="featured-title">{title}</h2>
      </div>
      <div className="carousel-wrapper">
        <div
          className="featured-list clean-featured-list scroll-x"
          ref={carouselRef}
        >
          {items.map((item, idx) => (
            <CardComponent
              key={`${item.id}-${idx}`}
              {...(CardComponent.name === "GenderCard"
                ? { movie: item }
                : { serie: item })}
              onClick={() => onCardClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}