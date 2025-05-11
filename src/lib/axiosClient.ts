import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Necesario para sesiones con Sanctum
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

// Intercepta respuestas con errores comunes
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    //  TODO: Handle 401 error
    /*
    if (error.response?.status === 401) {
      const publicPaths = ["/login", "/register", "/"];
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (!publicPaths.includes(pathname)) {
          window.location.href = "/login";
        }
      }
    }
    */
    return Promise.reject(error);
  }
);

export default axios;
