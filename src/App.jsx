import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Loader";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(import.meta.env.VITE_API_URL)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
          setLoading(false);
        });
    }, 3000);
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col body-background">
          {/* Toast Notifications */}
          <ToastContainer position="top-right" autoClose={2000} />

          {/* Header */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setFilter={setFilter}
            setSortOrder={setSortOrder}
          />

          {/* Main Content */}
          <main className="flex-grow flex items-center justify-center">
            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                {/* Loader will take half the viewport height */}
                <Loader />
              </div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProductList
                      products={products}
                      searchQuery={searchQuery}
                      filter={filter}
                      sortOrder={sortOrder}
                    />
                  }
                />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            )}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;