import React, { useState, useEffect } from "react";

const Categories = ({ className, filterStoresByCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(15); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/categories");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleShowMore = () => {
    setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 20);
  };
  // console.log(visibleCategories);

  const handleCategoryClick = (categoryId) => {
    filterStoresByCategory(categoryId);
    setSelectedCategory(categoryId);
  };

  // console.log(categories);
  // console.log(selectedCategory);

  return (
    <div className={`${className} my-[50px]`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>

      <ul className="grid grid-cols-1 gap-4">
        {categories.slice(0, visibleCategories).map((category) => (
          <li
            key={category.id}
            className={`bg-white shadow-md rounded-lg p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
              selectedCategory === category.id ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
            style={{ cursor: "pointer" }}
          >
            <span className="text-lg font-semibold">{category.name}</span>
          </li>
        ))}
      </ul>
      {categories.length > visibleCategories && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default Categories;
