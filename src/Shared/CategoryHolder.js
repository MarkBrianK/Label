import React, { useState, useEffect } from "react";
import Styles from "../../src/Assets/Styles/CategoryHolder.module.css";

function CategoryHolder({ children, handleCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://levick-6ab9bbf8750f.herokuapp.com/categories"
        );
        const categoriesData = await response.json();
        const sortedCategories = categoriesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleCategorySelect(category);
  };

  return (
    <div>
      <div className={Styles.categoryContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`${Styles.categoryButton} ${
              selectedCategory === category.name ? Styles.selectedCategory : ""
            }`}
          >
            <div className={Styles.outerCircle}>
              <img
                src={category.image}
                alt={`${category.name} category`}
                className={`${Styles.innerCircle}`}
              />
            </div>
            <p className={Styles.categoryName}>{category.name}</p>
          </button>
        ))}
      </div>
      {children(selectedCategory)}
    </div>
  );
}

export default CategoryHolder;
