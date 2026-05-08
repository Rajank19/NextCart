import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const res = await API.get(`/products/${id}`);

      setProduct(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ADD TO CART
  const addToCart = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await API.post(
        "/cart/add",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Cart ✅");

    } catch (err) {

      console.log(err);

      alert("Failed To Add");

    }
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        padding: "50px",
      }}
    >

      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >

        {/* IMAGE */}
        <img
          src={product.image_url}
          alt={product.title}
          style={{
            width: "450px",
            borderRadius: "20px",
          }}
        />

        {/* DETAILS */}
        <div style={{ maxWidth: "500px" }}>

          <h1
            style={{
              fontSize: "55px",
              marginBottom: "20px",
            }}
          >
            {product.title}
          </h1>

          <h2
            style={{
              color: "#22c55e",
              fontSize: "40px",
            }}
          >
            ₹ {product.price}
          </h2>

          <p
            style={{
              color: "#bbb",
              marginTop: "20px",
              lineHeight: "32px",
              fontSize: "20px",
            }}
          >
            {product.description}
          </p>

          <button
            onClick={addToCart}
            style={{
              marginTop: "40px",
              padding: "18px 40px",
              background: "#a855f7",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Add To Cart 🛒
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;