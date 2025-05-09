import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const ProductCard = ({ product }) => {
  const {
    addToCart = () => {},
    removeFromCart = () => {},
    cart = [],
    loading = {},
    notificationLoading = {},
  } = useContext(CartContext);

  const isInCart = cart.some((item) => item.id === product.id);

  const isAddLoading =
    loading[`${product.id}-add`] || notificationLoading[`${product.id}-add`];
  const isRemoveLoading =
    loading[`${product.id}-remove`] || notificationLoading[`${product.id}-remove`];

  return (
    <div className="bg-blue-200 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow my-6 max-w-xs mx-auto">
      {/* Product Name */}
      <h2 className="text-lg font-bold text-black mb-2">{product.name}</h2>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-lg mb-4"
      />

      {/* Product Description */}
      <p className="text-md text-black mb-4">{product.description}</p>

      {/* Product Price */}
      <p className="text-md font-bold text-yellow-900">${product.price}</p>

      {/* Availability */}
      <p
        className={`mt-2 text-sm font-bold uppercase ${
          product.availability ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.availability ? "In Stock" : "Out of Stock"}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        {/* Add to Cart Button */}
        <button
          onClick={() => {
            if (!isAddLoading) addToCart(product); // Safely call addToCart
          }}
          disabled={!product.availability || isAddLoading} // Disable if unavailable or loading
          className={`px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center ${
            (!product.availability || isAddLoading)
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-900 text-white cursor-pointer"
          }`}
        >
          {isAddLoading ? (
            <div className="loader w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Add"
          )}
        </button>

        {/* Remove from Cart Button */}
        <button
          onClick={() => {
            if (!isRemoveLoading) removeFromCart(product); // Safely call removeFromCart
          }}
          disabled={!isInCart || isRemoveLoading} // Disable if not in cart or loading
          className={`px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center ${
            (!isInCart || isRemoveLoading)
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          }`}
        >
          {isRemoveLoading ? (
            <div className="loader w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Remove"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
