// Archivo: useCategories.ts

import useSWR from "swr"
import axios from "@/lib/axiosClient"

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data)

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/categories", fetcher)

  const get = async (id: number) => {
    const res = await axios.get(`/api/categories/${id}`)
    return res.data.data
  }

  const getCategories = async () => {
    const res = await axios.get("/api/categories")
    return res.data.data
  }

  const create = async (payload: any) => {
    const res = await axios.post(`/api/categories`, payload)
    mutate()
    return res.data
  }

  const update = async (id: number, payload: any) => {
    const res = await axios.put(`/api/categories/${id}`, payload)
    mutate()
    return res.data
  }

  const remove = async (id: number) => {
    await axios.delete(`/api/categories/${id}`)
    mutate()
  }

  return {
    categories: data ?? [],
    isLoading,
    isError: error,
    get,
    getCategories,
    create,
    update,
    remove,
    mutate,
  }
}
