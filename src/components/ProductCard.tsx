import { Product } from "../services/productService";

interface ProductCardProps {
  product: Product;
  isDarkMode: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isDarkMode }) => {
  return (
    <div
      className={`border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-[500px] w-[300px] ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover mb-4 rounded transition-transform duration-300 hover:scale-105"
      />
      <h2
        className={`text-md mb-2 font-bold h-12 overflow-hidden ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {product.title}
      </h2>
      <p
        className={`mb-2 line-clamp-3 h-16 overflow-hidden ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {product.description}
      </p>
      <p className="text-green-600 font-semibold mb-2 h-8">
        Price: ${product.price}
      </p>
      <p className="text-yellow-500 font-semibold mb-2 mt-2 h-8">
        Rating: {product.rating.rate} ★ out of 5 ({product.rating.count}{" "}
        reviews)
      </p>
      <div className="mt-auto">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
