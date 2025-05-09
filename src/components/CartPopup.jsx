import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartPopup = ({ cart, isPopOverOpen, handlePopover }) => {
  // Safely calculate total cost (ensure cart is not undefined)
  const totalCost = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <Popover open={isPopOverOpen} handler={handlePopover} placement="bottom-end">
      {/* Cart Icon with Badge */}
      <PopoverHandler>
        <div
          className="relative flex items-center cursor-pointer text-yellow-400"
          onClick={handlePopover}
        >
          {/* Cart Icon */}
          <FiShoppingCart className="text-4xl" />
          {/* Display Cart Count Badge */}
          {cart?.length > 0 && (
            <span className="absolute top-0 right-1 bg-red-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
      </PopoverHandler>

      {/* Cart Popup Content */}
      <PopoverContent className="bg-yellow-200 text-white shadow-xl rounded-lg w-64">
        {cart?.length > 0 ? (
          <div>
            {/* List of Cart Items */}
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center text-black">
                  <span className="font-medium">{item.name} (x{item.quantity})</span>
                  <span className="font-bold">${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            {/* Total Cost */}
            <div className="font-bold border-t border-black pt-2 text-right text-black">
              Total: ${totalCost.toFixed(2)}
            </div>
            {/* Pay Now Button */}
            <div className="text-center mt-4">
              <Link
                to="/cart"
                className="bg-emerald-400 text-black px-4 py-2 rounded-md font-medium hover:bg-emerald-500 transition-all"
                onClick={handlePopover} // Close popup on button click
              >
                Pay Now
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-black text-center font-semibold">Your cart is empty!</p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartPopup;
