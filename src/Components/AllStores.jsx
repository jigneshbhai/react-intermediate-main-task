import React, { useState, useEffect } from "react";
import ShowStore from "./ShowStore";
import FilterByStatus from "./FilterByStatus";
import SearchByStore from "./SearchByStore";
import SortBy from "./SortBy";
import Categories from "./Categories";

const AllStores = ({ className }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isPromotedFilter, setIsPromotedFilter] = useState(false);
  const [cashbackEnabledFilter, setCashbackEnabledFilter] = useState(false);
  const [isSharableFilter, setIsSharableFilter] = useState(false);
  const alphabets = Array.from(Array(26), (_, i) =>
    String.fromCharCode(65 + i)
  );

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      filterStoresByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const filterStoresByCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/stores?cats=${categoryId}`
      );
      const data = await response.json();
      setFilteredStores(data);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering stores by category:", error);
      setLoading(false);
    }
  };
  //console.log(FilteredStores);

  const applyFilter = (status) => {
    setLoading(true);
    fetch(`http://localhost:3001/stores?status=${status}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredStores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error filtering stores:", error);
        setLoading(false);
      });
  };
  //console.log(FilteredStores);

  const searchStoreByName = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/stores?name_like=${name}`
      );
      const data = await response.json();
      setFilteredStores(data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching stores by name:", error);
      setLoading(false);
    }
  };
  //console.log(FilteredStores);

  const handleSort = async (option) => {
    setLoading(true);
    try {
      let url;
      switch (option) {
        case "featured":
          url = `http://localhost:3001/stores?_sort=featured&_order=desc`;
          break;
        case "popularity":
          url = `http://localhost:3001/stores?_sort=clicks&_order=desc`;
          break;
        case "cashback":
          url = `http://localhost:3001/stores?_sort=amount_type,cashback_amount&_order=asc,desc`;
          break;
        default:
          url = `http://localhost:3001/stores?_sort=name`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setFilteredStores(data);
      setLoading(false);
    } catch (error) {
      console.error("Error sorting stores:", error);
      setLoading(false);
    }
  };
  //console.log(FilteredStores);

  const filterByAlphabet = async (alphabet) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/stores?name_like=^${alphabet}`
      );
      const data = await response.json();
      setFilteredStores(data);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering stores by alphabet:", error);
      setLoading(false);
    }
  };
  //console.log(FilteredStores);

  const handleCheckboxChange = async (filterType) => {
    setLoading(true);
    try {
      let url;
      let filterValue;
      switch (filterType) {
        case "is_promoted":
          filterValue = !isPromotedFilter ? 1 : "";
          setIsPromotedFilter(filterValue);
          url = `http://localhost:3001/stores?is_promoted=${filterValue}`;
          break;
        case "cashback_enabled":
          filterValue = !cashbackEnabledFilter ? 1 : "";
          setCashbackEnabledFilter(filterValue);
          url = `http://localhost:3001/stores?cashback_enabled=${filterValue}`;
          break;
        case "is_sharable":
          filterValue = !isSharableFilter ? 1 : "";
          setIsSharableFilter(filterValue);
          url = `http://localhost:3001/stores?is_sharable=${filterValue}`;
          break;
        default:
          break;
      }
      const response = await fetch(url);
      const data = await response.json();
      setFilteredStores(data);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering stores:", error);
      setLoading(false);
    }
  };
  //console.log(FilteredStores);
  return (
    <div className={`my-[50px] ${className}`}>
      <div className="flex justify-between mb-4">
        <div className="w-2/3 pr-2">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <FilterByStatus applyFilter={applyFilter} />
            </div>
            <div className="w-1/2 pl-2">
              <SearchByStore searchStoreByName={searchStoreByName} />
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-2 flex flex-col items-center">
          <SortBy handleSort={handleSort} />
        </div>
      </div>
      <div className="mt-4">
        {alphabets.map((alphabet) => (
          <button
            key={alphabet}
            className="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 mb-2"
            onClick={() => filterByAlphabet(alphabet)}
          >
            {alphabet}
          </button>
        ))}
      </div>
      <div className="mt-4 mb-4 flex mx-2">
        <label className="flex items-center border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg">
          <input
            type="checkbox"
            checked={isPromotedFilter}
            onChange={() => handleCheckboxChange("is_promoted")}
            className="hidden"
          />
          <span className={`ml-2 ${isPromotedFilter ? "text-blue-500" : ""}`}>
            Is Promoted
          </span>
        </label>
        <label className="flex items-center border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg">
          <input
            type="checkbox"
            checked={cashbackEnabledFilter}
            onChange={() => handleCheckboxChange("cashback_enabled")}
            className="hidden"
          />
          <span
            className={`ml-2 ${cashbackEnabledFilter ? "text-blue-500" : ""}`}
          >
            Cashback Enabled
          </span>
        </label>
        <label className="flex items-center border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg">
          <input
            type="checkbox"
            checked={isSharableFilter}
            onChange={() => handleCheckboxChange("is_sharable")}
            className="hidden"
          />
          <span className={`ml-2 ${isSharableFilter ? "text-blue-500" : ""}`}>
            Is Sharable
          </span>
        </label>
      </div>
      <div className="flex">
        <div className="w-1/4">
          <Categories filterStoresByCategory={filterStoresByCategory} />
        </div>
        <div className="w-3/4">
          <ShowStore
            stores={filteredStores.length > 0 ? filteredStores : stores}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStores;
