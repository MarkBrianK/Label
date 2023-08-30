import React, { useState, useEffect } from "react";

import '../Assets/Styles/Carousel.css'

export default function Carousel({ newArrivals }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-slide the carousel
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [newArrivals]);

  return (
    <div className="carousel-container">
      {newArrivals.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <img src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
  );
}
