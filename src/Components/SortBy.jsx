import React from "react";

const SortBy = ({ handleSort }) => {
  const handleSortChange = (e) => {
    const option = e.target.value;
    handleSort(option);
  };

  return (
    <div className="mt-4">
      <label htmlFor="sort" className="mr-2">
        Sort By:
      </label>
      <select
        id="sort"
        className="px-2 py-1 border rounded"
        onChange={handleSortChange}
      >
        <option value="name">Name</option>
        <option value="featured">Featured</option>
        <option value="popularity">Popularity</option>
        <option value="cashback">Cashback</option>
      </select>
    </div>
  );
};

export default SortBy;
