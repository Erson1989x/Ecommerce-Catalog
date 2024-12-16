import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/productSlice";
import ProductCard from "./ProductCard";
import { RootState, AppDispatch } from "../app/store";

interface ProductListProps {
  searchTerm: string;
  sortOrder: string;
  isDarkMode: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm, sortOrder, isDarkMode }) => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    if (sortOrder === "rating") return b.rating.rate - a.rating.rate;
    return 0;
  });

  const totalPage = Math.ceil(sortedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} isDarkMode={isDarkMode} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 w-full max-w-screen-lg">
        <button
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="mx-4 text-gray-600 font-semibold">
          Page {currentPage} of {totalPage}
        </span>
        <button
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
