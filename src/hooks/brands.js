import axios from "@/lib/axiosClient";
import { isUndefined } from "swr/_internal";

export const useBrands = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getBrands = async ({ setBrands }) => {
    //await csrf();
    axios
      .get(`/api/brands`)
      .then((res) => setBrands(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const setBrand = async ({ setErrors, setStatus }, brand) => {
    await csrf();

    setErrors([]);

    if (isUndefined(brand.id)) {
      axios
        .post("/api/brands", brand)
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;

          setErrors(error);
        });
    } else {
      axios
        .post("/api/brands/" + brand.id, {
          ...brand,
          _method: "patch",
        })
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;
          setErrors(error);
        });
    }
  };

  const delBrand = async ({ setErrors, setStatus }, brand) => {
    await csrf();
    axios
      .post(`/api/brands/${brand}`,{
        _method:"delete"
      })
      .then((res) => setStatus(res.status))
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  return {
    getBrands,
    setBrand,
    delBrand,
  };
};
