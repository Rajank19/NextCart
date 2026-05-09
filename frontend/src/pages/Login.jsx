import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const loginUser = async () => {

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "https://nextcart-wxgk.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      alert("Login Success ✅");

      navigate("/products");

    } catch (err) {

      console.log(err.response?.data);
      console.log(err);

      alert("Login Failed ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >

      <div
        style={{
          width: "400px",
          background: "#111",
          padding: "30px",
          borderRadius: "14px",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login 🔐
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button
          onClick={loginUser}
          style={btn}
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </div>

    </div>
  );
}

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const btn = {
  width: "100%",
  padding: "14px",
  marginTop: "25px",
  background: "#a855f7",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Login;