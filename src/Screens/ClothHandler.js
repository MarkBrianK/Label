import React, { useState, useEffect } from "react";
import CardHolder from "../Shared/CardHolder";
import LoadingSpinner from "../Shared/LoadingSpinner"; // Import a loading spinner component
import "../Assets/Styles/Handler.css";



function ClothHandler({ clothes, handleViewMore, selectedCategory, user, isLoading }) {



  return (
    <div className="cloth-container">
      {isLoading ? (
        <LoadingSpinner /> // Display the loading spinner if isLoading is true
      ) : (
        clothes.map((item, index) => (
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
