import React from "react";
import CardHolder from "../Shared/CardHolder";
import LoadingSpinner from "../Shared/LoadingSpinner";
import "../Assets/Styles/Handler.css";

function ClothHandler({ clothes, handleViewMore, selectedCategory, user, isLoading }) {
  const sortedClothes = clothes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (clothes.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color:"white"
        }}
      >
        <p>Out of Stock</p>
      </div>
    );
  }

  return (
    <div className="cloth-container" style={{ minHeight: "100vh" }}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        sortedClothes.map((item, index) => (
          <CardHolder
            key={index}
            user={user}
            cloth={item}
            handleViewMore={() => handleViewMore(item)}
            className="cards"
          />
        ))
      )}
    </div>
  );
}

export default ClothHandler;
