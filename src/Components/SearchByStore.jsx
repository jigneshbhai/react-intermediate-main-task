import React, { useState } from "react";

const SearchByStore = ({ searchStoreByName }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //console.log(searchTerm);
  const handleSearch = () => {
    searchStoreByName(searchTerm);
  };

  return (
    <div className="mt-4 flex">
      <input
        type="text"
        placeholder="Search by store name"
        value={searchTerm}
        onChange={handleInputChange}
        className="px-1 py-1 border rounded mr-2"
      />
      <button
        className="px-1 py-1 bg-blue-500 text-white rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchByStore;
