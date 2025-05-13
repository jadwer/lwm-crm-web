import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
// Archivo: useForm.ts

import useSWR from 'swr'
import axios from '@/lib/axiosClient'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const useForm = () => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/forms', fetcher)

  const get = async (id: number) => {
    const res = await axios.get(`/api/forms/${id}`)
    return res.data
  }

  const create = async (payload: any) => {
    const res = await axios.post(`/api/forms`, payload)
    mutate()
    return res.data
  }

  const update = async (id: number, payload: any) => {
    const res = await axios.put(`/api/forms/${id}`, payload)
    mutate()
    return res.data
  }

  const remove = async (id: number) => {
    await axios.delete(`/api/forms/${id}`)
    mutate()
  }

  return {
    [`forms`]: data,
    isLoading,
    isError: error,
    get,
    create,
    update,
    remove,
    mutate,
  }
}
