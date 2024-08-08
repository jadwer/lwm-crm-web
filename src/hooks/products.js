import axios from "@/lib/axios";
import { isUndefined } from "swr/_internal";

export const useProducts = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getProduct = async ({ id, setProducto }) => {
    //    await csrf();

    axios
      .get(`/api/products/${id}`)
      .then((res) => setProducto(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getAllProducts = async ({ setProductos }) => {
    //    await csrf();
    axios
      .get(`/api/products`)
      .then((res) => {
        setProductos(res.data);
        console.log("getAllProds");
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getFilteredProducts = async ({ setProductos }, searchFilter) => {
    //    await csrf();
    axios
      .get(`/api/products${searchFilter}`)
      .then((res) => setProductos(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const setProduct = async ({ setErrors, setStatus }, producto) => {
    //    await csrf();
    if (isUndefined(producto.id)) {
      axios
        .post(`/api/products`, producto, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => setStatus(res.status))
        .catch((error) => {
          if (error.response.status !== 409) throw error;
          setErrors(error);
          console.log(error);
        });
    } else {
      axios
        .post(
          `/api/products/${producto.id}`,
          { ...producto, _method: "patch" },
          { headers: { "content-type": "multipart/form-data" } }
        )
        .then((res) => setStatus(res.status))
        .catch((error) => {
          if (error.response.status !== 409) throw error;
          setErrors(error);
          console.log(error);
        });
    }
  };

  const delProduct = async ({ setErrors, setStatus }, product) => {
    //    await csrf();
    axios
      .post(`/api/products/${product}`, {
        _method: "delete",
      })
      .then((res) => setStatus(res.status))
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  const CSVImport = async ({ setErrors, setStatus }, list) => {
    //    await csrf();
    axios
      .post(`/api/CSVImport`, list, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        setStatus(res.data.status);
        console.log(res.data.status);
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
        setErrors(error);
        console.log(error);
      });
  };

  return {
    getAllProducts,
    getFilteredProducts,
    getProduct,
    setProduct,
    delProduct,
    CSVImport,
  };
};
