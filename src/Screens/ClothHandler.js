import React from "react";
import CardHolder from "../Shared/CardHolder";
import LikeButton from "./LikesHandler";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ClothHandler({ clothes, handleViewMore, selectedCategory }) {


  // Filter clothes based on the selected category
  const filteredClothes = selectedCategory
    ? clothes.filter((cloth) => cloth.category_id === selectedCategory.id)
    : clothes;

    
  // Shuffle the filtered clothes array
  const shuffledClothes = shuffleArray([...filteredClothes]);

  return (
    <div className="cloth-container">
      {shuffledClothes.map((item, index) => (
        <CardHolder
          key={index}
          cloth={item}
          handleViewMore={() => handleViewMore(item)}
        >
        <LikeButton cloth={item} />
        </CardHolder>

      ))}
    </div>
  );
}

export default ClothHandler;
