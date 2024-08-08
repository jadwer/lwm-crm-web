import axios from "@/lib/axios";
import { isUndefined } from "swr/_internal";

export const useCategories = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getCategories = async ({ setCategories }) => {
//    await csrf();
    axios
      .get(`/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => {
        console.log(error);
        //if (error.response.status !== 409) throw error;
      });
  };

  const setCategory = async ({ setErrors, setStatus }, category) => {
 //   await csrf();

    setErrors([]);

    if (isUndefined(category.id)) {
      axios
        .post("/api/categories", category)
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;

          setErrors(error.response.errors);
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
//    await csrf();
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

  return {
    getCategories,
    setCategory,
    delCategory,
  };
};
