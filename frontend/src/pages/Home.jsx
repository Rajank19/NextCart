import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={hero}>
        <h1 style={title}>Welcome to NextCart</h1>
        <p style={subtitle}>
          Shop Fashion, Electronics & Home Products at Best Prices
        </p>

        <button style={btn} onClick={() => navigate("/products")}>
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section style={{ padding: "50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Top Categories
        </h2>

        <div style={grid}>
          <div style={card}>👕 Fashion</div>
          <div style={card}>📱 Electronics</div>
          <div style={card}>🏠 Home</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={footer}>
        © 2026 NextCart | Built with React + FastAPI
      </footer>
    </div>
  );
}

const hero = {
  background: "linear-gradient(135deg,#111,#2563eb)",
  color: "white",
  textAlign: "center",
  padding: "90px 20px",
};

const title = {
  fontSize: "52px",
  marginBottom: "15px",
};

const subtitle = {
  fontSize: "20px",
  marginBottom: "30px",
};

const btn = {
  padding: "14px 28px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "25px",
};

const card = {
  background: "white",
  padding: "45px",
  borderRadius: "14px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "22px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const footer = {
  marginTop: "50px",
  padding: "25px",
  textAlign: "center",
  background: "#111",
  color: "white",
};

export default Home;