// Archivo: useUnits.ts

import useSWR from 'swr'
import axios from '@/lib/axiosClient'

const fetcher = (url: string) => axios.get(url).then(res => res.data.data)

export const useUnits = () => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/units', fetcher)

  const getUnits = async () => {
    const res = await axios.get('/api/units')
    return res.data.data
  }

  const get = async (id: number) => {
    const res = await axios.get(`/api/units/${id}`)
    return res.data.data
  }

  const create = async (payload: any) => {
    const res = await axios.post(`/api/units`, payload)
    mutate()
    return res.data
  }

  const update = async (id: number, payload: any) => {
    const res = await axios.put(`/api/units/${id}`, payload)
    mutate()
    return res.data
  }

  const remove = async (id: number) => {
    await axios.delete(`/api/units/${id}`)
    mutate()
  }

  return {
    units: data ?? [],
    isLoading,
    isError: error,
    getUnits,
    get,
    create,
    update,
    remove,
    mutate,
  }
}
