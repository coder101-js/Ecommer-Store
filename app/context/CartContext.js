"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from MongoDB or localStorage
  useEffect(() => {
    const loadCart = async () => {
      console.log("🛒 [loadCart] Session status:", status);
      if (status === "loading") return;

      if (session?.user) {
        console.log("✅ Logged in as:", session.user.email);
        try {
          const res = await axios.get("/api/save?type=cart");
          console.log("📥 Cart loaded from DB:", res.data.items);
          setCart(res.data.items || []);
        } catch (err) {
          console.error("❌ Failed to load cart from DB:", err.message);
          setCart([]);
        }
      } else {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("📥 Cart loaded from localStorage:", savedCart);
        setCart(savedCart);
      }

      setLoading(false);
    };

    loadCart();
  }, [session, status]);

  // Save to localStorage if not logged in
  useEffect(() => {
    if (!session?.user) {
      console.log("💾 Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, session]);

  const syncCartToDB = async (updatedCart) => {
    if (!session?.user) {
      console.log("⚠️ Not logged in, skipping DB sync.");
      return;
    }

    console.log("⬆️ Syncing cart to DB:", updatedCart);
    try {
      await axios.post("/api/save", {
        type: "cart",
        data: updatedCart,
      });
      console.log("✅ Cart successfully synced to DB.");
    } catch (err) {
      console.error("❌ Error syncing to DB:", err.message);
    }
  };

  const addToCart = (product) => {
    console.log("➕ Adding to cart:", product);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }

      syncCartToDB(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    console.log("❌ Removing from cart:", id);
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      syncCartToDB(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    console.log("🔁 Updating quantity:", { id, quantity });
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      syncCartToDB(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    console.log("🧹 Clearing cart...");
    setCart([]);
    syncCartToDB([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
        ready: !loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
