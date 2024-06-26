import React, { useState, useEffect } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";

export default function Carousel({ newArrivals }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      setCurrentIndex(0);
    };
  }, [newArrivals]);

  const carouselStyle = {
    overflow: "hidden",
    width: "100%",
    height: "100%",
    position: "relative",
    marginBottom: "20px"
  };

  const imageStyle = {
    width: "auto",
    maxHeight: "80px",
    objectFit: "contain",
    borderRadius: "12px",
    transition: "transform 0.5s ease"
  };

  return (
    <BootstrapCarousel
      activeIndex={currentIndex}
      onSelect={() => {}}
      controls={false}
      indicators={false}
      style={carouselStyle}
      wrap={true}
    >
      {newArrivals.map((item, index) => (
        <BootstrapCarousel.Item key={item.id}>
          {Array.isArray(item.images) ? (
            <img
              src={item.images[0]}
              alt={`${item.name}`}
              className="d-block w-100"
              style={imageStyle}
            />
          ) : (
            <img
              src={item.images}
              alt={`${item.name}`}
              className="d-block w-100"
              style={imageStyle}
            />
          )}
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}
