import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH FUNCTION
  const fetchProducts = async () => {

    try {

      const res = await API.get("/products/");

      console.log("PRODUCTS:", res.data);

      setProducts(res.data);

    } catch (err) {

      console.log("PRODUCT FETCH ERROR:", err);

    }
  };

  // ADD TO CART
  const addToCart = async (product) => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      // LOGIN CHECK
      if (!token) {

        alert("Please Login First ❌");

        navigate("/login");

        return;
      }

      // API CALL
      const res = await API.post(
        "/cart/add",
        {
          product_id: Number(product.id),
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CART RESPONSE:", res.data);

      alert("Added To Cart ✅");

    } catch (err) {

      console.log(
        "CART ERROR:",
        err.response?.data || err
      );

      alert("Failed To Add Cart ❌");

    }
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((p) =>
    (p.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        Our Products 🚀
      </h1>

      {/* SEARCH BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >

        <input
          type="text"
          placeholder="Search Products 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            background: "#111",
            color: "white",
          }}
        />

      </div>

      {/* PRODUCTS GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",
          gap: "20px",
        }}
      >

        {filteredProducts.map((p) => (

          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "14px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >

            {/* IMAGE */}

            <img
              src={
                p.image_url ||
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              }
              alt={p.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* TITLE */}

            <h2 style={{ marginTop: "15px" }}>
              {p.title}
            </h2>

            {/* PRICE */}

            <h3 style={{ color: "#22c55e" }}>
              ₹ {p.price}
            </h3>

            {/* DESCRIPTION */}

            <p style={{ color: "#bbb" }}>
              {p.description}
            </p>

            {/* BUTTON */}

            <button
              onClick={(e) => {

                e.stopPropagation();

                addToCart(p);

              }}
              style={{
                width: "100%",
                padding: "12px",
                background: "#a855f7",
                color: "white",
                border: "none",
                borderRadius: "10px",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add To Cart 🛒
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;