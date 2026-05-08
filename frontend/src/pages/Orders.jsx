import React, { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

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
          marginBottom: "50px",
          fontSize: "50px",
        }}
      >
        My Orders 📦
      </h1>

      {orders.length === 0 ? (

        <h2 style={{ textAlign: "center" }}>
          No Orders Yet ❌
        </h2>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(320px,1fr))",
            gap: "25px",
          }}
        >

          {orders.map((order) => (

            <div
              key={order.id}
              style={{
                background: "#111",
                padding: "25px",
                borderRadius: "14px",
                boxShadow:
                  "0 0 10px rgba(255,255,255,0.1)",
              }}
            >

              <h2 style={{ color: "#a855f7" }}>
                Order ID: {order.id}
              </h2>

              <h3>
                👤 {order.customerName}
              </h3>

              <p>
                📍 {order.address}
              </p>

              <p>
                🏙 {order.city}
              </p>

              <p>
                📮 {order.pincode}
              </p>

              <p>
                📞 {order.mobile}
              </p>

              <h3 style={{ color: "#22c55e" }}>
                ₹ {order.total}
              </h3>

              <p style={{ color: "#bbb" }}>
                {order.date}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                Order Confirmed ✅
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;