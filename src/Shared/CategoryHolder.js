import React, { useState, useEffect } from "react";
import axios from "axios";
import Levick from '../Assets/Image/Levick.png'

function CategoryHolder({ children }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get(
          "https://levick-7b15defb7ee9.herokuapp.com/categories"
        );
        // Sort the categories alphabetically by name
        const sortedCategories = categoriesResponse.data.sort((a, b) =>
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
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() => handleCategoryClick(null)}
          style={{
            backgroundColor: selectedCategory === null ? "#f6f6f6" : "transparent",
            borderRadius: "50%",
            cursor: "pointer",
            border: "1px solid goldenrod",
            marginRight: "10px",
            width: "60px",
            height: "60px",
            minWidth: "60px",
            minHeight: "60px",
            padding: 0,
          }}
        >
          <img
            src={Levick}
            alt="Show All"
            style={{ width: "100%", height: "100%", borderRadius: "50%", marginRight: "5px" }}
          />
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            style={{
              backgroundColor:
                selectedCategory === category.name ? "#f6f6f6" : "transparent",
              borderRadius: "50%",
              cursor: "pointer",
              border: "1px solid goldenrod",
              marginRight: "10px",
              width: "60px",
              height: "60px",
              minWidth: "60px",
              minHeight: "60px",
              padding: 0,
            }}
          >
            <img
              src={category.image} // Make sure this is a valid image URL or file path
              alt={category.name}
              style={{ width: "100%", height: "100%", borderRadius: "50%", marginRight: "5px" }}
            />
          </button>
        ))}
      </div>
      {children(selectedCategory)}
    </div>
  );
}

export default CategoryHolder;
