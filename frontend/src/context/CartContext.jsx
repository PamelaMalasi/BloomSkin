import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Components/UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const { userInfo } = useContext(UserContext);


  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo?.id) return;

      try {
        const res = await axios.post("http://localhost:5001/cart", {
          userId: userInfo.id,
          items: [],
        });

        setCart(
          res.data.items.map((entry) => ({
            ...entry.itemId,
            quantity: entry.quantity,
          }))
        );
        setCartId(res.data._id);
      } catch (err) {
        console.error("Failed to fetch user cart:", err);
      }
    };

    fetchCart();
  }, [userInfo]);

  //changes saved in cart
  useEffect(() => {
    const saveCart = async () => {
      if (!userInfo?.id || !cartId) return;

      try {
        const cartPayload = {
          userId: userInfo.id,
          items: cart
            .filter((item) => item && item._id)
            .map((item) => ({
              itemId: item._id,
              quantity: item.quantity || 1,
            })),
        };

        await axios.patch(`http://localhost:5001/cart/${cartId}`, cartPayload);
      } catch (err) {
        console.error("Failed to save cart:", err);
      }
    };

    if (cart.length > 0) saveCart();
  }, [cart, cartId, userInfo]);

  const addToCart = (item) => {
    const exists = cart.find((c) => c._id === item._id);
    if (exists) {
      setCart((prev) =>
        prev.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const removeAllFromCart = () => {
    setCart([]);
    if (cartId) {
      axios
        .patch(`http://localhost:5001/cart/${cartId}`, { items: [] })
        .catch((err) => console.error("Failed to clear cart in DB:", err));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, removeAllFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
