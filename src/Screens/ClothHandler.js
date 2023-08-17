import React from "react";
import CardHolder from "../Shared/CardHolder";

function ClothHandler({ clothes, handleViewMore }) {
  return (
    <div className="cloth-container">
      {clothes.map((cloth, index) => (
        <CardHolder
          key={index}
          cloth={cloth}
          handleViewMore={() => handleViewMore(cloth)} // Pass the cloth to handleViewMore
        />
      ))}
    </div>
  );
}

export default ClothHandler;
