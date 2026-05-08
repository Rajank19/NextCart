import React, { useState } from "react";
import axios from "axios";

function Checkout() {

  const total = localStorage.getItem("cartTotal");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");

  // PAYMENT FUNCTION
  const handlePayment = async () => {

    // VALIDATION
    if (
      !name ||
      !address ||
      !city ||
      !pincode ||
      !mobile
    ) {
      alert("Please Fill All Fields ❌");
      return;
    }

    try {

      // CREATE ORDER
      const res = await axios.post(
        "http://127.0.0.1:8000/payments/create-order",
        {
          amount: Number(total),
        }
      );

      console.log("PAYMENT RESPONSE:", res.data);

      const order = res.data;

      // RAZORPAY OPTIONS
      const options = {

        key: "rzp_test_SmZCRQOBXa7YGq",

        amount: order.amount,

        currency: order.currency,

        name: "NextCart",

        description: "UPI Payment",

        image:
          "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

        order_id: order.id,

        // ENABLE METHODS
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        // DIRECT UPI FIRST
        config: {
          display: {

            blocks: {

              upi: {
                name: "Pay Using UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
            },

            sequence: [
              "block.upi",
            ],

            preferences: {
              show_default_blocks: true,
            },
          },
        },

        // PAYMENT SUCCESS
        handler: function (response) {

          console.log(
            "PAYMENT SUCCESS:",
            response
          );

          // CREATE ORDER OBJECT
          const newOrder = {

            id: Date.now(),

            customerName: name,

            address,

            city,

            pincode,

            mobile,

            total,

            paymentId:
              response.razorpay_payment_id,

            orderId:
              response.razorpay_order_id,

            signature:
              response.razorpay_signature,

            date: new Date().toLocaleString(),
          };

          // GET OLD ORDERS
          const oldOrders =
            JSON.parse(
  localStorage.getItem("orders") || "[]"
);

          // SAVE ORDER
          localStorage.setItem(
            "orders",
            JSON.stringify([
              ...oldOrders,
              newOrder,
            ])
          );

          // CLEAR CART
          localStorage.removeItem("cartTotal");

          alert("Payment Successful 🎉");

          // REDIRECT
          window.location.href = "/orders";
        },

        // USER PREFILL
        prefill: {

          name: name,

          contact: mobile,
        },

        // NOTES
        notes: {
          address: address,
          city: city,
          pincode: pincode,
        },

        // UI THEME
        theme: {
          color: "#a855f7",
        },
      };

      // OPEN PAYMENT WINDOW
      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {

      console.log(
        "PAYMENT ERROR:",
        err.response?.data || err
      );

      alert("Payment Failed ❌");

    }
  };

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "50px",
        }}
      >
        Checkout 💳
      </h1>

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#111",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        }}
      >

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={input}
        />

        {/* ADDRESS */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          style={input}
        />

        {/* CITY */}
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          style={input}
        />

        {/* PINCODE */}
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
          style={input}
        />

        {/* MOBILE */}
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
          style={input}
        />

        {/* TOTAL */}
        <h2
          style={{
            marginTop: "30px",
            color: "#22c55e",
          }}
        >
          Total: ₹ {total}
        </h2>

        {/* BUTTON */}
        <button
          style={btn}
          onClick={handlePayment}
        >
          Pay Now 🚀
        </button>

      </div>

    </div>
  );
}

// INPUT STYLE
const input = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "#1f2937",
  color: "white",
  fontSize: "15px",
};

// BUTTON STYLE
const btn = {
  width: "100%",
  padding: "14px",
  marginTop: "30px",
  background: "#a855f7",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

export default Checkout;