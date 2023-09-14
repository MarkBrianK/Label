import React from "react";
import CardHolder from "../Shared/CardHolder";
import LikeButton from "./LikesHandler";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ClothHandler({ clothes, handleViewMore, selectedCategory, isLoggedIn }) {
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
          <div style={{ display: "flex", alignItems: "center", gap: "20%", marginLeft: "30%" }}>
            <LikeButton cloth={item} />
            {isLoggedIn ? (
              <Link style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "black" }} to={`comments/${item.id}`} className="comment-link ml-2">
                <FaComment /> {item.comments.length}
              </Link>
            ) : (
              <span style={{ color: "black" }}>
                <FaComment /> {item.comments.length}
              </span>
            )}
          </div>
        </CardHolder>
      ))}
    </div>
  );
}

export default ClothHandler;
