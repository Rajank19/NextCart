import axios from "axios";

const API = axios.create({
  baseURL: "https://nextcart-wxgk.onrender.com",
});

export default API;