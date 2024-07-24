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

  const getCategories = async ({ setCategories }) => {
    await csrf();
    axios
      .get(`/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => {
        console.log(error);
        //if (error.response.status !== 409) throw error;
      });
  };

  const setCategory = async ({ setErrors, setStatus }, category) => {
    await csrf();

    setErrors([]);

    if (isUndefined(category.id)) {
      axios
        .post("/api/categories", category)
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;

          setErrors(error.response.data.errors);
        });
    } else {
      axios
        .post("/api/categories/" + category.id, {
          ...category,
          _method: "patch",
        })
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;
          setErrors(error.response.data.errors);
        });
    }
  };

  const delCategory = async ({ setErrors, setStatus }, category) => {
    await csrf();
    axios
      .post(`/api/categories/${category}`,{
        _method:"delete"
      })
      .then((res) => setStatus(res.status))
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  const getBrands = async ({ setBrands }) => {
    await csrf();
    axios
      .get(`/api/brands`)
      .then((res) => setBrands(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const getUnits = async ({ setUnits }) => {
    await csrf();
    axios
      .get(`/api/units`)
      .then((res) => setUnits(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  return {
    getAllProducts,
    getProduct,
    getCategories,
    setCategory,
    delCategory,
    getBrands,
    getUnits,
  };
};
