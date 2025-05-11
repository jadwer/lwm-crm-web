import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Necesario para sesiones con Sanctum
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export default axios;
