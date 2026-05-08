import React, { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  // FETCH CART
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      // cart data
      const cartRes = await API.get("/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // all products
      const productRes = await API.get("/products/");

      const products = productRes.data;

      // merge cart + product
      const finalData = cartRes.data.map((item) => {
        const product = products.find(
          (p) => p.id === item.product_id
        );

        return {
          ...item,
          product,
        };
      });

      setCartItems(finalData);

    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE ITEM
  const removeItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item Removed ❌");

      // refresh cart
      fetchCart();

    } catch (err) {
      console.log(err);
      alert("Failed To Remove");
    }
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (
      (item.product?.price || 0) * item.quantity
    );
  }, 0);

  localStorage.setItem("cartTotal", totalPrice);

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "50px",
        }}
      >
        My Cart 🛒
      </h1>

      {/* TOTAL */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            color: "#22c55e",
          }}
        >
          Total: ₹ {totalPrice}
        </h2>

        {/* CHECKOUT BUTTON */}
        <button
          onClick={() => window.location.href = "/checkout"}
          style={{
            padding: "14px 30px",
            background: "#a855f7",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Proceed To Checkout 🚀
        </button>
      </div>

      {cartItems.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          Cart is Empty ❌
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 0 10px rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={item.product?.image_url}
                alt={item.product?.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h2 style={{ marginTop: "15px" }}>
                {item.product?.title}
              </h2>

              <h3 style={{ color: "#22c55e" }}>
                ₹ {item.product?.price}
              </h3>

              <p style={{ color: "#bbb" }}>
                {item.product?.description}
              </p>

              <h3>
                Quantity: {item.quantity}
              </h3>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;