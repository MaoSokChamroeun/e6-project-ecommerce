import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // GET CART FROM DATABASE
  const getCart = async () => {

    try {

      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:4000/api/user/cart",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        setCart(res.data.cart);
      }

    } catch (error) {
      console.log("Fetch cart failed", error);
    }

  };

  // ADD CART (UI update)
  const addToCart = (product) => {

    setCart((prev) => {

      const exist = prev.find(
        (item) => item.product._id === product._id
      );

      if (exist) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });

  };

  // REMOVE CART
  const removeFromCart = async (productId) => {

    try {

      const token = sessionStorage.getItem("token");

      await axios.delete(
        `http://localhost:4000/api/user/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCart((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );

    } catch (error) {
      console.log("Remove cart failed", error);
    }

  };

  // INCREASE QUANTITY
const increaseQty = async (productId, currentQty) => {

  try {

    const token = sessionStorage.getItem("token");

    const newQty = currentQty + 1;

    await axios.put(
      "http://localhost:4000/api/user/cart/update",
      {
        productId,
        quantity: newQty
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );

  } catch (error) {
    console.log("Increase qty failed", error);
  }

};

  // DECREASE QUANTITY
const decreaseQty = async (productId, currentQty) => {

  try {

    const token = sessionStorage.getItem("token");

    const newQty = currentQty > 1 ? currentQty - 1 : 1;

    await axios.put(
      "http://localhost:4000/api/user/cart/update",
      {
        productId,
        quantity: newQty
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );

  } catch (error) {
    console.log("Decrease qty failed", error);
  }

};

  // CLEAR CART (used when logout)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        getCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};