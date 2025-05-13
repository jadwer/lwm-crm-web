import { handleApiErrors } from "@/hooks/utils/handleApiErrors";
// Archivo: useCategory.ts

import useSWR from "swr";
import axios from "@/lib/axiosClient";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/categorys", fetcher);

  const get = async (id: number) => {
    const res = await axios.get(`/api/categorys/${id}`);
    return res.data;
  };

  const getCategories = async () => {
    const res = await axios.get("/api/products");
    return res.data;
  };

  const create = async (payload: any) => {
    const res = await axios.post(`/api/categorys`, payload);
    mutate();
    return res.data;
  };

  const update = async (id: number, payload: any) => {
    const res = await axios.put(`/api/categorys/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/categorys/${id}`);
    mutate();
  };

  return {
    [`categorys`]: data,
    isLoading,
    isError: error,
    get,
    getCategories,
    create,
    update,
    remove,
    mutate,
  };
};

