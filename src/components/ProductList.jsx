import { useContext } from "react";
import CartContext from "../context/CartContext";
import ProductCard from "./ProductCard";

const ProductList = ({ products, searchQuery, filter, sortOrder }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    return (
      (searchQuery === "" || product.name?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filter === "" || (filter === "inStock" && product.availability))
    );
  });

  return (
    <div className="flex justify-center body-background">
      <div
        className={`grid gap-6 p-4 ${
          filteredProducts.length === 1 ? "grid-cols-1 place-items-center" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-lg" // Explicit width adjustment
              style={{ minWidth: "300px", maxWidth: "100%" }} // Prevent shrinking
            >
              <ProductCard
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-teal-500 font-semibold">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
