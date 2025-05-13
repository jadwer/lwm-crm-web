import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
// src/hooks/useProducts.ts

import useSWR from 'swr'
import axios from '@/lib/axiosClient'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const useProducts = () => {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/products', fetcher)

  const getProduct = async (id: number) => {
    const res = await axios.get(`/api/products/${id}`)
    return res.data
  }

const getAllProducts = async () => {
  const res = await axios.get('/api/products')
  return res.data
}

const getFilteredProducts = async (searchFilter: string) => {
    const res = await axios.get(`/api/products${searchFilter}`)
    return res.data
  }

  const createProduct = async (producto: FormData) => {
    const res = await axios.post('/api/products', producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    mutate()
    return res.data
  }

  const updateProduct = async (id: number, producto: FormData) => {
    const res = await axios.post(`/api/products/${id}`, producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    mutate()
    return res.data
  }

  const deleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`)
    mutate()
  }

  const importCSV = async (csv: FormData) => {
    const res = await axios.post('/api/CSVImport', csv, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    mutate()
    return res.data
  }

  return {
    products,
    isLoading,
    isError: error,
    mutate,
    getProduct,
    getAllProducts,
    getFilteredProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    importCSV,
  }
}
