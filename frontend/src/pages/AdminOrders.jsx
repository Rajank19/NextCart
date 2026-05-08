import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/orders/");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://127.0.0.1:8000/orders/${id}`, {
        status: status,
      });

      alert("Updated ✅");
      fetchOrders();
    } catch (err) {
      alert("Failed");
    }
  };

  // ✅ Delete order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/orders/${id}`);
      alert("Deleted 🗑️");
      fetchOrders();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <div style={page}>
      <h1 style={{ marginBottom: "30px" }}>Admin Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders</h2>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={card}>
            
            {/* LEFT */}
            <div>
              <h3>Order #{order.id}</h3>
              <p style={price}>₹{order.total_amount}</p>
              <p style={date}>
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div style={right}>
              
              {/* STATUS */}
              <span
                style={{
                  ...status,
                  background:
                    order.status === "Pending"
                      ? "orange"
                      : order.status === "Delivered"
                      ? "green"
                      : "red",
                }}
              >
                {order.status}
              </span>

              {/* ACTIONS */}
              <button
                style={deliverBtn}
                onClick={() => updateStatus(order.id, "Delivered")}
              >
                Deliver
              </button>

              <button
                style={cancelBtn}
                onClick={() => updateStatus(order.id, "Cancelled")}
              >
                Cancel
              </button>

              <button
                style={deleteBtn}
                onClick={() => deleteOrder(order.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* 🎨 STYLES */

const page = {
  padding: "40px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const status = {
  padding: "6px 12px",
  borderRadius: "20px",
  color: "white",
  fontSize: "12px",
};

const price = {
  color: "green",
  fontWeight: "bold",
};

const date = {
  color: "#555",
};

const deliverBtn = {
  background: "green",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "6px",
};

const cancelBtn = {
  background: "orange",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "6px",
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "6px",
};

export default AdminOrders;