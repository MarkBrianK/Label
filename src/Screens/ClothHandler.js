import React from "react";
import CardHolder from "../Shared/CardHolder";

function ClothHandler({ clothes, handleViewMore, selectedCategory }) {
  // Filter clothes based on the selected category
  const filteredClothes = selectedCategory
    ? clothes.filter((cloth) => cloth.category_id === selectedCategory.id)
    : clothes;

  return (
    <div className="cloth-container">
      {filteredClothes.map((cloth, index) => (
        <CardHolder
          key={index}
          cloth={cloth}
          handleViewMore={() => handleViewMore(cloth)}
        />
      ))}
    </div>
  );
}

export default ClothHandler;
