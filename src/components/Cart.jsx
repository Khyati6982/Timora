import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate total cost
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto pt-16 p-4 bg-white text-gray-900">
      {/* Header */}
      {cart.length > 0 && (
        <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center sm:text-left">
          Your Shopping Cart
        </h1>
      )}

      {/* Cart with Items */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="sm:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-yellow-200 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-md transition-shadow"
              >
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md mr-4"
                />

                {/* Item Details */}
                <div className="flex flex-col flex-grow items-center sm:items-start text-center sm:text-left">
                  <p className="text-lg font-bold text-blue-600">{item.name}</p>
                  <p className="text-md font-semibold text-blue-700">${item.price}</p>
                  <p className="text-sm text-blue-800 mt-2">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-yellow-300 text-black px-3 py-1 rounded-md font-bold hover:bg-yellow-400 transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-blue-600">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-yellow-300 text-black px-3 py-1 rounded-md font-bold hover:bg-yellow-400 transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary Section */}
          <div
            className="bg-yellow-200 rounded-lg p-6 shadow-md"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4 text-blue-600">Cart Summary</h2>
            <p className="text-md mb-2 text-blue-700">Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p className="text-md mb-2 text-blue-700">Total Cost:</p>
            <p className="text-lg font-bold mb-6 text-blue-600">${totalCost.toFixed(2)}</p>
            <button
              className="bg-green-400 text-black px-4 py-2 rounded-md font-medium hover:bg-green-500 transition-all w-full cursor-pointer"
              onClick={() => {
                alert("Redirecting to payment gateway...")
                setTimeout(() => {
                  clearCart();
                  window.location.href="/";
                }, 1000);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart Section
        <div className="text-center justify-center sm:justify-center">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Your Cart is Empty!</h2>
          <p className="text-yellow-600 mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/"
            className="bg-yellow-400 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
