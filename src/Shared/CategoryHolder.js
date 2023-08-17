import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryHolder({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get(
          'https://levick-7b15defb7ee9.herokuapp.com/categories'
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

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          style={{
            backgroundColor: '#f6f6f6',
            padding: '5px 10px',
            borderRadius: '30px',
            cursor: 'pointer',
            width: '141px',
            height: '62px',
            border: 'none',
            marginBottom: '10px', 
          }}
        >
          {children}
        </button>
      ))}
    </div>
  );
}

export default CategoryHolder;
