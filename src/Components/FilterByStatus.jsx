import React, { useState } from "react";

const FilterByStatus = ({ applyFilter }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  //console.log(status);
  const handleFilter = () => {
    applyFilter(status);
  };

  return (
    <div className="mt-4 flex" >
      <label htmlFor="status" className="mr-2">
        Status:
      </label>
      <select
        id="status"
        className="px-2 py-1 border rounded"
        value={status}
        onChange={handleStatusChange}
      >
        <option value="">Select Status</option>
        <option value="publish">active</option>
        <option value="draft">coming soon</option>
        <option value="trash">discontinued</option>
      </select>
      <button
        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default FilterByStatus;
