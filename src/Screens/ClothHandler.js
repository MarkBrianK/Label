import React, { useState, useEffect } from "react";
import CardHolder from "../Shared/CardHolder";
import LoadingSpinner from "../Shared/LoadingSpinner"; // Import a loading spinner component
import "../Assets/Styles/Handler.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function ClothHandler({ clothes, handleViewMore, selectedCategory, user, isLoading }) {
  const [shuffledClothes, setShuffledClothes] = useState([]);

  useEffect(() => {
    const newShuffledClothes = shuffleArray([...clothes]);
    setShuffledClothes(newShuffledClothes);
  }, [clothes]);

  return (
    <div className="cloth-container">
      {isLoading ? (
        <LoadingSpinner /> // Display the loading spinner if isLoading is true
      ) : (
        shuffledClothes.map((item, index) => (
          <CardHolder
            key={index}
            user={user}
            cloth={item}
            handleViewMore={() => handleViewMore(item)}
            className="cards"
          >
            {/* Content for CardHolder */}
          </CardHolder>
        ))
      )}
    </div>
  );
}

export default ClothHandler;
