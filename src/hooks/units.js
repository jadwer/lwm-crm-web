import axios from "@/lib/axios";
import { isUndefined } from "swr/_internal";

export const useUnits = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUnits = async ({ setUnits }) => {
    await csrf();
    axios
      .get(`/api/units`)
      .then((res) => setUnits(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const setUnit = async ({ setErrors, setStatus }, unit) => {
    await csrf();

    setErrors([]);

    if (isUndefined(unit.id)) {
      axios
        .post("/api/units", unit)
        .then((response) => {
          setStatus(response.status);
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error;

          setErrors(error);
        });
    } else {
      axios
        .post("/api/units/" + unit.id, {
          ...unit,
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

  const delUnit = async ({ setErrors, setStatus }, unit) => {
    await csrf();
    axios
      .post(`/api/units/${unit}`,{
        _method:"delete"
      })
      .then((res) => setStatus(res.status))
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  return {
    getUnits,
    setUnit,
    delUnit,
  };
};
