import React, { useState } from "react";

const ShowStore = ({ stores }) => {
  const storesPerRow = 5; // Number of stores to display per row
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (storeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(storeId)
        ? prevFavorites.filter((id) => id !== storeId)
        : [...prevFavorites, storeId]
    );
  };

  const redirectToStoreDetails = (storeId) => {
    window.open(`/store/${storeId}`, "_blank");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">List of Stores:</h2>
      <div className="flex flex-wrap m-4 w-full">
        {stores.map((store, index) => (
          <div
            key={store.id}
            className="w-1/5 mb-4 mr-4 p-4 rounded-md shadow-md cursor-pointer transform transition-transform hover:scale-105 relative"
            onClick={() => redirectToStoreDetails(store.id)}
          >
            <button
              className={`absolute top-0 right-0 m-2 p-2 rounded-full ${
                favorites.includes(store.id) ? "bg-red-400" : "bg-blue-300"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(store.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    favorites.includes(store.id)
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 10h16M4 14h16M4 18h16"
                  }
                />
              </svg>
            </button>
            <img
              src={store.logo}
              alt={store.name}
              className="w-full h-auto mb-2 rounded-md"
            />
            <p className="text-center font-semibold">{store.name}</p>
            <p className="text-center">
              {store.cashback_enabled === 0
                ? "No cashback available"
                : `${store.rate_type === "upto" ? "Upto" : "Flat"} ${
                    store.amount_type === "fixed"
                      ? `$${store.cashback_amount.toFixed(2)}`
                      : `${store.cashback_amount.toFixed(2)}%`
                  } cashback`}
            </p>
          </div>
        ))}
        {Array(storesPerRow - (stores.length % storesPerRow || storesPerRow))
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="w-1/5 mb-4" />
          ))}
      </div>
    </div>
  );
};

export default ShowStore;
