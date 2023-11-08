import React from "react";
import StarRating from "../Screens/StarRating";
import Header from "./Header";
import styles from "../Assets/Styles/StoryLine.module.css"

export default function StoryLine({ clothes, user }) {
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
    } else if (sales >= 1) {
      return 1;
    } else {
      return 0;
    }
  };

  // Sort the clothes array by rating in descending order
  const sortedClothes = clothes.slice().sort((a, b) => {
    return calculateRatingFromSales(b.sales.length) - calculateRatingFromSales(a.sales.length);
  });

  const cardsPerRow = 3; // Number of cards to display per row

  return (
    <div className={styles["storyline-container"]}>
      <h1 className={styles["storyline-header"]}>Top 20 Sales</h1>
      <ul className={styles["storyline-list"]}>
        {sortedClothes.map((clothing) => (
          <li key={clothing.id} className={styles["storyline-item"]}>
            <div className={styles["storyline-card"]}>
              <h3 className={styles["storyline-name"]}>{clothing.name}</h3>
              <p className={styles["storyline-description"]}>{clothing.description}</p>
              <p className={styles["storyline-size"]}>{clothing.size}</p>
              <p className={styles["storyline-rating"]}>
                 <StarRating rating={calculateRatingFromSales(clothing.sales.length)} />
              </p>

            </div>
          </li>
        ))}
      </ul>
      <Header user={user} />
    </div>
  );
}