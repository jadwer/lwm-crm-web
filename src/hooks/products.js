import axios from "@/lib/axios";
import { isUndefined } from "swr/_internal";

export const useProducts = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getProduct = async ({ id, setProducto }) => {
    await csrf();

    axios
      .get(`/api/products/${id}`)
      .then((res) => setProducto(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getAllProducts = async ({ setProductos }) => {
    await csrf();
    axios
      .get(`/api/products`)
      .then((res) => setProductos(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const setProduct = async ({ setErrors, setStatus }, producto) => {
    console.log(producto);
    await csrf();
    axios
      .post(`/api/products`, producto, {headers:{"content-type": "multipart/form-data"}})
      .then((res) => setStatus(res.status))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
        setErrors(error);
        console.log(error)
      });
  };

  return {
    getAllProducts,
    getProduct,
    setProduct,
  };
};
