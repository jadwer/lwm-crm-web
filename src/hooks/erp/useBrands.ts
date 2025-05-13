import useSWR from 'swr'
import axios from '@/lib/axiosClient'

const fetcher = (url: string) => axios.get(url).then(res => res.data.data)

export const useBrands = () => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/brands', fetcher)

  const get = async (id: number) => {
    const res = await axios.get(`/api/brands/${id}`)
    return res.data.data
  }

  const getBrands = async () => {
    const res = await axios.get("/api/brands")
    return res.data.data
  }

  const create = async (payload: any) => {
    const res = await axios.post(`/api/brands`, payload)
    mutate()
    return res.data
  }

  const update = async (id: number, payload: any) => {
    const res = await axios.put(`/api/brands/${id}`, payload)
    mutate()
    return res.data
  }

  const remove = async (id: number) => {
    await axios.delete(`/api/brands/${id}`)
    mutate()
  }

  return {
    brands: data ?? [],
    isLoading,
    isError: error,
    get,
    getBrands,
    create,
    update,
    remove,
    mutate,
  }
}
