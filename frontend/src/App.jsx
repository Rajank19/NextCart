// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Cart() {

//   const navigate = useNavigate();

//   const cart =
//     JSON.parse(localStorage.getItem("cart") || "[]")

//   const total = cart.reduce(
//     (acc, item) =>
//       acc + item.price * item.quantity,
//     0
//   );

//   const removeItem = (id) => {

//     const updatedCart = cart.filter(
//       (item) => item.id !== id
//     );

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//     window.location.reload();
//   };

//   const proceedCheckout = () => {

//     localStorage.setItem(
//       "cartTotal",
//       total
//     );

//     // IMPORTANT FIX ✅
//     navigate("/checkout");
//   };

//   return (
//     <div
//       style={{
//         background: "#050505",
//         minHeight: "100vh",
//         padding: "40px",
//         color: "white",
//       }}
//     >

//       <h1
//         style={{
//           textAlign: "center",
//           fontSize: "60px",
//           marginBottom: "20px",
//         }}
//       >
//         My Cart 🛒
//       </h1>

//       <h2
//         style={{
//           textAlign: "center",
//           color: "#22c55e",
//           marginBottom: "40px",
//         }}
//       >
//         Total: ₹ {total}
//       </h2>

//       <div
//         style={{
//           textAlign: "center",
//           marginBottom: "40px",
//         }}
//       >

//         <button
//           onClick={proceedCheckout}
//           style={{
//             padding: "15px 35px",
//             background: "#a855f7",
//             color: "white",
//             border: "none",
//             borderRadius: "12px",
//             cursor: "pointer",
//             fontSize: "20px",
//             fontWeight: "bold",
//           }}
//         >
//           Proceed To Checkout 🚀
//         </button>

//       </div>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns:
//             "repeat(auto-fill,minmax(300px,1fr))",
//           gap: "30px",
//         }}
//       >

//         {cart.length === 0 ? (

//           <h2
//             style={{
//               textAlign: "center",
//               width: "100%",
//             }}
//           >
//             Cart is Empty 🥲
//           </h2>

//         ) : (

//           cart.map((item) => (

//             <div
//               key={item.id}
//               style={{
//                 background: "#111",
//                 padding: "20px",
//                 borderRadius: "14px",
//                 boxShadow:
//                   "0 8px 20px rgba(0,0,0,0.4)",
//               }}
//             >

//               <img
//                 src={item.image_url}
//                 alt={item.title}
//                 style={{
//                   width: "100%",
//                   height: "250px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />

//               <h2
//                 style={{
//                   marginTop: "15px",
//                 }}
//               >
//                 {item.title}
//               </h2>

//               <h3
//                 style={{
//                   color: "#22c55e",
//                 }}
//               >
//                 ₹ {item.price}
//               </h3>

//               <p>
//                 Quantity: {item.quantity}
//               </p>

//               <button
//                 onClick={() =>
//                   removeItem(item.id)
//                 }
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   marginTop: "15px",
//                   background: "red",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Remove ❌
//               </button>

//             </div>

//           ))

//         )}

//       </div>

//     </div>
//   );
// }

// export default Cart;

// import React from "react";

// function App() {

//   return (

//     <div
//       style={{
//         background: "black",
//         color: "white",
//         minHeight: "100vh",
//         padding: "40px",
//       }}
//     >

//       <h1>
//         NextCart Working 🚀
//       </h1>

//     </div>

//   );
// }

// export default App;

// import React from "react";
// import Navbar from "./components/Navbar";

// function App() {

//   return (

//     <div>

//       <Navbar />

//       <h1
//         style={{
//           color: "white",
//           background: "black",
//           minHeight: "100vh",
//           padding: "40px",
//         }}
//       >
//         Navbar Working 🚀
//       </h1>

//     </div>

//   );
// }

// export default App;

// import React from "react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";

// function App() {

//   return (

//     <div>

//       <Navbar />

//       <Home />

//     </div>

//   );
// }

// export default App;

import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;