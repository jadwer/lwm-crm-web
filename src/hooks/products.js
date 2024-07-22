import axios from "@/lib/axios";

export const useProducts = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getProduct = async ({id, setProducto}) => {
    await csrf()

    axios
      .get(`/api/products/${id}`)
      .then((res) => setProducto(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });      
  };


  const getAllProducts = async ({setProductos}) => {
    await csrf()
    axios
      .get(`/api/products`)
      .then((res) => setProductos(res.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });      
  };

  return {
    getAllProducts,
    getProduct,
  };
}
