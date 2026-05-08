import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // SAFE TOKEN
  const token =
    localStorage.getItem("token") || "";

  let email = "";

  // SAFE JWT DECODE
  if (token) {

    try {

      const tokenParts =
        token.split(".");

      if (tokenParts.length === 3) {

        const payload = JSON.parse(
          atob(tokenParts[1])
        );

        email =
          payload?.sub || "";
      }

    } catch (error) {

      console.log(
        "Invalid Token"
      );

      localStorage.removeItem(
        "token"
      );
    }
  }

  // LOGOUT
  const logoutUser = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <nav style={nav}>

      <h2
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        NextCart
      </h2>

      <div style={menu}>

        <Link
          style={link}
          to="/"
        >
          Home
        </Link>

        <Link
          style={link}
          to="/products"
        >
          Products
        </Link>

        <Link
          style={link}
          to="/cart"
        >
          Cart
        </Link>

        <Link
          style={link}
          to="/orders"
        >
          Orders
        </Link>

        {token ? (

          <>
            <span style={user}>
              {email}
            </span>

            <button
              style={btn}
              onClick={logoutUser}
            >
              Logout
            </button>
          </>

        ) : (

          <Link
            style={link}
            to="/login"
          >
            Login
          </Link>

        )}

      </div>

    </nav>

  );
}

const nav = {
  background: "#111",
  color: "white",
  padding: "16px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const menu = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const link = {
  color: "white",
  textDecoration: "none",
};

const user = {
  color: "#00ff99",
  fontWeight: "bold",
};

const btn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;