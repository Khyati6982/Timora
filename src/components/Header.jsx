import React, { useState } from "react";
import { useContext } from "react";
import { FiWatch } from "react-icons/fi";
import { Link } from "react-router-dom"; 
import CartContext from "../context/CartContext";
import CartPopup from "./CartPopup";

const Header = ({ searchQuery, setSearchQuery, setFilter, setSortOrder }) => {
  const { cart } = useContext(CartContext);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const handlePopover = () => {
    setIsPopOverOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-blue-700 text-white shadow-md flex justify-between items-center gap-4 p-6 flex-wrap sm:flex-nowrap">
      {/* Clickable Watch Store Link */}
      <Link to="/" className="flex items-center gap-2">
        <FiWatch className="text-yellow-400 text-3xl" />
        <h1 className="text-2xl font-extrabold tracking-wide">Timora</h1>
      </Link>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-1/3 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none px-3 py-2 bg-blue-500 text-white placeholder-white"
      />

      {/* Filters */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-md bg-blue-500 text-white border border-gray-300 shadow-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="">All</option>
        <option value="inStock">In Stock</option>
      </select>

      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="rounded-md bg-blue-500 text-white border border-gray-300 shadow-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="">Sort by Price</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>

      {/* Cart Popup */}
      <CartPopup cart={cart} isPopOverOpen={isPopOverOpen} handlePopover={handlePopover} />
    </header>
  );
};

export default Header;
