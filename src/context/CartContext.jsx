import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const CartContext = createContext({
  cart: [], // Default value to prevent undefined
  addToCart: () => {}, // Default noop function
  removeFromCart: () => {}, // Default noop function
  loading: {}, // Default empty loading state
  notificationLoading: {}, // Default empty notification loading state
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState({});
  const [notificationLoading, setNotificationLoading] = useState({}); // Track notifications per action

  // Reusable function for toast notifications with custom styles
  const triggerToast = async (message, type, productId, action) => {
    const notificationKey = `${productId}-${action}`;

    // Update notification loading state asynchronously
    await new Promise((resolve) =>
      setTimeout(() => {
        setNotificationLoading((prev) => ({ ...prev, [notificationKey]: true }));
        resolve();
      }, 0)
    );

    const toastId = `${productId}-${action}`;
    if (!toast.isActive(toastId)) {
      toast(message, {
        type,
        toastId,
        autoClose: 1000,
        className:
          type === "success"
            ? "toast-success"
            : type === "error"
            ? "toast-error"
            : "toast-info",
        onClose: async () => {
          // Update loading state after notification close
          await new Promise((resolve) =>
            setTimeout(() => {
              setNotificationLoading((prev) => ({
                ...prev,
                [notificationKey]: false,
              }));
              resolve();
            }, 0)
          );
        },
      });
    }
  };

  const setProductLoading = (loadingKey, isLoading) => {
    setLoading((prev) => ({ ...prev, [loadingKey]: isLoading }));
  };

  const addToCart = async (product) => {
    const loadingKey = `${product.id}-add`;
    setProductLoading(loadingKey, true); // Specific loader for "add"
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          triggerToast(
            `${product.name} quantity increased!`,
            "info",
            product.id,
            "add"
          );
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          triggerToast(
            `${product.name} added to cart!`,
            "success",
            product.id,
            "add"
          );
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      triggerToast(
        "Failed to add item. Please try again!",
        "error",
        product.id,
        "add"
      );
    } finally {
      setProductLoading(loadingKey, false); // Reset loader for "add"
    }
  };

  const removeFromCart = async (product) => {
    const loadingKey = `${product.id}-remove`;
    setProductLoading(loadingKey, true); // Specific loader for "remove"
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct && existingProduct.quantity > 1) {
          triggerToast(
            `${product.name} quantity decreased!`,
            "info",
            product.id,
            "remove"
          );
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          triggerToast(
            `${product.name} removed from cart!`,
            "error",
            product.id,
            "remove"
          );
          return prevCart.filter((item) => item.id !== product.id);
        }
      });
    } catch (error) {
      triggerToast(
        "Failed to remove item. Please try again!",
        "error",
        product.id,
        "remove"
      );
    } finally {
      setProductLoading(loadingKey, false); // Reset loader for "remove"
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        notificationLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
