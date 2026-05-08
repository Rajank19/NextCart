import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? { background: "#111", color: "white" }
      : {};

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "white",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2>NextCart</h2>

        <Link to="/admin" style={{ ...link, ...isActive("/admin") }}>
          Dashboard
        </Link>

        <Link to="/admin/products" style={{ ...link, ...isActive("/admin/products") }}>
          Products
        </Link>

        <Link to="/admin/orders" style={{ ...link, ...isActive("/admin/orders") }}>
          Orders
        </Link>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {children}
      </div>
    </div>
  );
}

const link = {
  display: "block",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  textDecoration: "none",
  color: "black",
};

export default AdminLayout;