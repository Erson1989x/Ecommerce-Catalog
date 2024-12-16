import React, { useState } from "react";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`min-h-screen mx-auto p-4 md:p-8 lg:p-12 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-center mb-4">Product Catalog</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2 mb-4 w-full text-gray-600 shadow-md h-12 md:w-1/2 lg:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-lg p-2 ml-4 text-gray-600 shadow-md h-12"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => toggleDarkMode()}
          className="p-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Toggle DM
        </button>
      </div>
      <ProductList searchTerm={searchTerm} sortOrder={sortOrder} isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
