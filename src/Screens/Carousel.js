import React, { useState, useEffect } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";

export default function Carousel({ newArrivals }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
    }, 3000);

    // Clear the interval and reset the currentIndex when the component unmounts
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
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "auto",
    maxHeight: "80px", // Set a specific height for your carousel images
    objectFit: "contain",
    borderRadius: "12px",
  };

  return (
    <BootstrapCarousel
      activeIndex={currentIndex}
      onSelect={() => {}}
      controls={false} // Set controls to false to remove arrows
      indicators={false} // Set indicators to false to remove page indicators
      style={carouselStyle} // Apply carousel styles
      wrap={true} // Enable continuous circular motion
    >
      {newArrivals.map((item, index) => (
        <BootstrapCarousel.Item key={item.id}>
          {Array.isArray(item.images) ? (
            <img
              src={item.images[0]}
              alt={`${item.name}`}
              className="d-block w-100"
              style={imageStyle} // Apply image styles
            />
          ) : (
            <img
              src={item.images}
              alt={`${item.name}`}
              className="d-block w-100"
              style={imageStyle} // Apply image styles
            />
          )}
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}