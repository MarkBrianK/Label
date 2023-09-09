import React, { useState, useEffect } from "react";

function CategoryHolder({ children, handleCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/categories"
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
    handleCategorySelect(category); // Call the handleCategorySelect function
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
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
              src={category.image}
              alt={category.name}
              style={{ width: "100%", height: "100%", borderRadius: "50%", marginRight: "5px" }}
            />
            <p style={{color:"white", fontSize:"xx-small", marginTop:"4px"}}>{category.name}</p>
          </button>
        ))}
      </div>
      {children(selectedCategory)}
    </div>
  );
}

export default CategoryHolder;
