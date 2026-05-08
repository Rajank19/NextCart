import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image_url: "",
    brand: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/products/"
      );

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // ADD PRODUCT
  const addProduct = async () => {

    try {

      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        image_url: form.image_url,
        brand: form.brand,
      };

      await axios.post(
        "http://127.0.0.1:8000/products/",
        payload
      );

      alert("Product Added Successfully ✅");

      fetchProducts();

      resetForm();

    } catch (err) {

      console.log(err.response?.data || err);

      alert("Failed To Add Product ❌");

    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/products/${id}`
      );

      alert("Product Deleted ✅");

      fetchProducts();

    } catch (err) {

      console.log(err);

      alert("Delete Failed ❌");

    }
  };

  // EDIT PRODUCT
  const editProduct = (product) => {

    setEditingId(product.id);

    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image_url: product.image_url,
      brand: product.brand,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        image_url: form.image_url,
        brand: form.brand,
      };

      await axios.put(
        `http://127.0.0.1:8000/products/${editingId}`,
        payload
      );

      alert("Product Updated ✅");

      fetchProducts();

      setEditingId(null);

      resetForm();

    } catch (err) {

      console.log(err);

      alert("Update Failed ❌");

    }
  };

  // RESET FORM
  const resetForm = () => {

    setForm({
      title: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image_url: "",
      brand: "",
    });

  };

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
          marginBottom: "40px",
          fontSize: "50px",
        }}
      >
        Admin Products ⚡
      </h1>

      {/* FORM */}
      <div style={formBox}>

        <input
          name="title"
          placeholder="Product Title"
          style={input}
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          style={input}
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          style={input}
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="brand"
          placeholder="Brand"
          style={input}
          value={form.brand}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Stock"
          style={input}
          value={form.stock}
          onChange={handleChange}
        />

        <input
          name="image_url"
          placeholder="Image URL"
          style={input}
          value={form.image_url}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          style={textarea}
          value={form.description}
          onChange={handleChange}
        />

        {editingId ? (
          <button
            style={updateBtn}
            onClick={updateProduct}
          >
            Update Product
          </button>
        ) : (
          <button
            style={addBtn}
            onClick={addProduct}
          >
            Add Product
          </button>
        )}

      </div>

      {/* PRODUCTS */}
      <div style={grid}>

        {products.map((p) => (

          <div key={p.id} style={card}>

            <img
              src={p.image_url}
              alt={p.title}
              style={image}
            />

            <h2>{p.title}</h2>

            <h3 style={{ color: "#22c55e" }}>
              ₹ {p.price}
            </h3>

            <p style={{ color: "#bbb" }}>
              {p.description}
            </p>

            <p>
              Brand: {p.brand}
            </p>

            <p>
              Category: {p.category}
            </p>

            <p>
              Stock: {p.stock}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >

              <button
                style={editBtn}
                onClick={() => editProduct(p)}
              >
                Edit
              </button>

              <button
                style={deleteBtn}
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* STYLES */

const formBox = {
  background: "#111",
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "50px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const textarea = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  minHeight: "120px",
};

const addBtn = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const updateBtn = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill,minmax(280px,1fr))",
  gap: "25px",
};

const card = {
  background: "#111",
  padding: "20px",
  borderRadius: "14px",
};

const image = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "10px",
};

const editBtn = {
  flex: 1,
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  flex: 1,
  padding: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default AdminProducts;