import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
  try {
  const [o, p] = await Promise.all([
    axios.get("https://nextcart-wxgk.onrender.com/orders/"),
    axios.get("https://nextcart-wxgk.onrender.com/products/"),
  ]);

      setOrders(o.data);
      setProducts(p.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total_amount || 0),
    0
  );

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: "25px" }}>Dashboard</h1>

      {/* KPI CARDS */}
      <div style={grid}>
        <div style={{ ...card, borderLeft: "5px solid #3b82f6" }}>
          <h4>Total Orders</h4>
          <h1>{orders.length}</h1>
        </div>

        <div style={{ ...card, borderLeft: "5px solid #22c55e" }}>
          <h4>Total Revenue</h4>
          <h1 style={{ color: "#22c55e" }}>₹{totalRevenue}</h1>
          <p style={{ color: "#16a34a", fontSize: "14px" }}>
            +12% from last week 📈
          </p>
        </div>

        <div style={{ ...card, borderLeft: "5px solid #f59e0b" }}>
          <h4>Total Products</h4>
          <h1>{products.length}</h1>
        </div>
      </div>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        <h2>Recent Orders</h2>

        <button style={viewBtn} onClick={() => navigate("/admin/orders")}>
          View All →
        </button>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <p style={{ marginTop: "20px" }}>No orders yet</p>
      )}

      {/* ORDERS LIST */}
      <div>
        {orders.slice(0, 5).map((o) => (
          <div
            key={o.id}
            style={{
              ...row,
              borderLeft:
                (o.status || "Pending") === "Pending"
                  ? "5px solid #f59e0b"
                  : o.status === "Delivered"
                  ? "5px solid #22c55e"
                  : "5px solid #ef4444",
            }}
            onClick={() => navigate("/admin/orders")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <strong style={{ fontSize: "18px" }}>
                Order #{o.id}
              </strong>

              <p style={{ margin: "5px 0", color: "#16a34a" }}>
                ₹{o.total_amount}
              </p>

              <p style={{ fontSize: "12px", color: "#666" }}>
                {new Date().toLocaleDateString()}
              </p>

              <hr style={{ opacity: 0.2 }} />
            </div>

            <span
              style={{
                ...status,
                background:
                  (o.status || "Pending") === "Pending"
                    ? "#f59e0b"
                    : o.status === "Delivered"
                    ? "#22c55e"
                    : "#ef4444",
              }}
            >
              {o.status || "Pending"}
            </span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

/* 🎨 STYLES */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "white",
  padding: "16px",
  marginTop: "12px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "0.3s",
};

const status = {
  padding: "6px 14px",
  borderRadius: "20px",
  color: "white",
  fontSize: "12px",
  fontWeight: "500",
};

const viewBtn = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "black",
  color: "white",
  cursor: "pointer",
};

export default AdminDashboard;