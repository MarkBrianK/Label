import React from "react";
import StarRating from "../Screens/StarRating";
import Header from "./Header";

export default function StoryLine({ clothes, user}) {
  // Function to calculate the rating based on sales
  const calculateRatingFromSales = (sales) => {
    if (sales >= 100) {
      return 5; // Highest rating for items with 100 or more sales
    } else if (sales >= 50) {
      return 4; // High rating for items with 50 or more sales
    } else if (sales >= 20) {
      return 3; // Moderate rating for items with 20 or more sales
    } else if (sales >= 10) {
      return 2; // Low rating for items with 10 or more sales
    } else if (sales>=1){
      return 1;

    }
    else{
      return 0;
    }

  };

  return (
    <div>
      <h1>Top Sales</h1>
      <ul>
        {clothes.map((clothing) => (
          <li key={clothing.id} style={
            {listStyleType:"none"}
          }>
            <div>
              <h3>{clothing.name}</h3>
              <p>Description: {clothing.description}</p>
              <p>Price: Kes{clothing.price}</p>
              <p>Size: {clothing.size}</p>
              <p>Category: {clothing.category.name}</p>
              <p>Rating: <StarRating rating={calculateRatingFromSales(clothing.sales.length)} /></p>
            </div>
          </li>
        ))}
      </ul>
      <Header user={user}/>
    </div>
  );
}
